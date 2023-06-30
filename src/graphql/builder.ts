import type { context } from './context';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import SchemaBuilder from '@pothos/core';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';
import PrismaPlugin from '@pothos/plugin-prisma';
import ErrorsPlugin from '@pothos/plugin-errors';
import RelayPlugin from '@pothos/plugin-relay';
import TracingPlugin, { wrapResolver, isRootField } from '@pothos/plugin-tracing';

import prisma from '#/prisma';

type ISchemaBuilder = {
  Scalars: {
    Date: { Input: Date; Output: Date };
    TimestampTZ: { Input: Date; Output: Date };
    UUID: { Input: string; Output: string };
    Tuple: { Input: number[]; Output: number[] };
  };
  PrismaTypes: PrismaTypes;
  Context: ReturnType<typeof context>;
};

export const builder = new SchemaBuilder<ISchemaBuilder>({
  plugins: [PrismaPlugin, ErrorsPlugin, RelayPlugin, TracingPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String'
  },
  prisma: {
    client: prisma
  },
  errorOptions: {
    defaultTypes: []
  },
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: (config) => isRootField(config),
    // Log resolver execution duration
    wrap: (resolver, options, config) =>
      wrapResolver(resolver, (error, duration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            '\x1B[34m%s',
            `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`
          );

          if (error) console.log(error);
        }

        // const data = {
        //   duration,
        //   args: {},
        //   description: config.description ?? '',
        //   kind: config.kind,
        //   pothosOptions: {},
        //   name: config.name ?? '',
        //   parentType: config.parentType ?? ''
        // };

        // prisma.gqlMetric.create({ data });
      })
  }
});

builder.addScalarType('Date', DateResolver, {});
builder.addScalarType('TimestampTZ', DateTimeResolver, {});
builder.scalarType('UUID', {
  serialize: (n) => n,
  parseValue: (n) => {
    if (typeof n === 'string') {
      return n;
    }

    throw new Error('Value must be string');
  }
});

builder.scalarType('Tuple', {
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value as number[];
  }
});
builder.queryType({});
builder.mutationType({});
builder.objectType(Error, {
  name: 'Error',
  fields: (t) => ({
    message: t.exposeString('message')
  })
});
