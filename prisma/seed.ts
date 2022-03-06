import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: `Cinan`,
      email: 'cinan@gmail.com',
    },
  });

  await prisma.tag.createMany({
      data: [
          {
              name: "scientific"
          },
          {
              name: "animals"
          },
          {
              name: "nature"
          },
          {
              name: "web"
          },
          {
              name: "human"
          }
      ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
