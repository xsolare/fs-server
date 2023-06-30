import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

export const users = [
  ...[...new Array(10)].map(() => ({
    id: uuid(),
    login: faker.person.firstName().toLowerCase(),
    password: uuid()
  }))
];
