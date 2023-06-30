/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import type { IUser } from '../../../models/user';

import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

import { generateTokens, secrets } from '../../utils/jwt';
import { UserPrisma } from '.';

import { builder } from '#/graphql/builder';
import UserService from '#/services/user.service';
import AuthService from '#/services/auth.service';
import { hashToken } from '#/graphql/utils/hash-token';

const service = new UserService();
const authService = new AuthService();

class AuthUser {
  user: IUser;
  accessToken: string;
  refreshToken: string;

  constructor(user: IUser, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

const AuthedUser = builder.objectType(AuthUser, {
  name: 'AuthedUser',
  fields: (t) => ({
    user: t.field({
      type: UserPrisma,
      resolve: (v) => v.user as any
    }),
    accessToken: t.exposeString('accessToken'),
    refreshToken: t.exposeString('refreshToken')
  })
});

//* ==== SignUp User ==================================================== *//
export interface IUserSignUpInput {
  login: string;
  password: string;
}

const UserSignUpInput = builder.inputRef<IUserSignUpInput>('UserSignUpInput').implement({
  fields: (t) => ({
    login: t.string({ required: true }),
    password: t.string({ required: true })
  })
});

builder.mutationField('signUp', (t) =>
  t.field({
    description: 'Sign up user',
    type: AuthedUser,
    errors: { types: [Error] },
    args: { data: t.arg({ type: UserSignUpInput, required: true }) },
    resolve: async (root, args, ctx, info) => {
      const existing = await service.getByWhere({ where: { login: args.data.login } });
      if (existing) {
        throw new Error('User already exists please signIn');
      }

      const user = await service.post(args.data);

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id
      });

      return {
        user,
        accessToken,
        refreshToken
      } as any;
    }
  })
);

//* ==== SignIn User ==================================================== *//
export interface IUserSignInInput {
  login: string;
  password: string;
}

const UserSignInInput = builder.inputRef<IUserSignInInput>('UserSignInInput').implement({
  fields: (t) => ({
    login: t.string({ required: true }),
    password: t.string({ required: true })
  })
});

builder.mutationField('signIn', (t) =>
  t.field({
    description: 'Sign in',
    type: AuthedUser,
    errors: { types: [Error] },
    args: { data: t.arg({ type: UserSignInInput, required: true }) },
    resolve: async (root, args, ctx, info) => {
      const existing = await service.getByWhere({ where: { login: args.data.login } });

      if (!existing) {
        throw new Error('No user found');
      }
      const validPassword = await bcrypt.compare(args.data.password, existing.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(existing, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existing.id
      });

      return {
        user: existing,
        accessToken,
        refreshToken
      } as any;
    }
  })
);

//* ==== Refresh token ================================================== *//
builder.mutationField('refreshToken', (t) =>
  t.field({
    description: 'Refreshes the access token',
    type: AuthUser,
    errors: { types: [Error] },
    args: {
      refreshToken: t.arg({
        type: 'String',
        required: true
      })
    },
    resolve: async (root, args, ctx) => {
      const payload = jwt.verify(args.refreshToken, secrets.JWT_REFRESH_SECRET) as jwt.JwtPayload;
      const savedRefreshToken = await authService.getRefreshTokenByWhere({
        where: { id: payload?.jti as string }
      });
      if (!savedRefreshToken || savedRefreshToken.revoked === true) {
        throw new Error('Unauthorized');
      }
      const hashedToken = hashToken(args.refreshToken);
      if (hashedToken !== savedRefreshToken.hashedToken) {
        throw new Error('Unauthorized');
      }
      const user = (await service.getByWhere({ where: { id: payload.userId } })) as IUser | null;
      if (!user) {
        throw new Error('Unauthorized');
      }
      await authService.updateRefreshToken({
        where: { id: savedRefreshToken.id },
        data: {
          revoked: true
        }
      });

      const jti = uuid();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await authService.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id
      });

      return {
        accessToken,
        refreshToken
      } as any;
    }
  })
);
