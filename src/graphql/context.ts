import type { YogaInitialContext } from 'graphql-yoga';

import { initContextCache } from '@pothos/core';

import { authenticateUser } from './utils/authenticate-user';

import prisma from '#/prisma';

export const context = ({ request: req }: YogaInitialContext) => ({
  ...initContextCache(),
  prisma,
  user: authenticateUser(prisma, req),
  req
});
