import { PrismaClient } from '@prisma/client';
import * as categories from './data/categories.json';
import * as products from './data/products.json';
import * as users from './data/users.json';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    categories.map((c) => prisma.categories.create({ data: c })),
    products.map((p) => prisma.products.create({ data: p })),
    users.map((u) => prisma.users.create({ data: u })),
  ]);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
