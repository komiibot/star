import { PrismaClient, UserType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      {
        id: "583925649807245322",
        userType: "DEV",
      },
      {
        id: "199801459469058048",
        userType: "DEV",
      },
      {
        id: "1048860807842234469",
        userType: "DEV"
      }
    ],
    skipDuplicates: true,
  });
  await prisma.guild.createMany({
    data: [
      {
        id: "1063684563588632577",
        guildType: "PREMIUM"
      }
    ]
  })
  return console.log(`Created data`);
}

main()
  .catch((err) => console.log(err))
  .finally(async () => await prisma.$disconnect());
