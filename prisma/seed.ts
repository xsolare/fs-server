/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-promise-executor-return */
import { users } from './mock/user';
import prisma from '../src/prisma';

async function run() {
  console.log('\x1B[34m%s', '✨ Run seeds');

  await Promise.all(
    users.map(
      (value) =>
        new Promise(async (r) => {
          await prisma.user.upsert({
            create: value,
            update: {},
            where: {
              id: value.id
            }
          });
          r(true);
        })
    )
  )
  console.log('\x1B[32m%s\x1B[0m', '✅ users');

  console.log('\x1B[34m%s', '✨ All seeds success');

  await prisma.$disconnect();
}

run().catch(() => {
  console.log('\x1b[31m%s\x1B[0m', '❌ Seed');
  process.exit(1);
});
