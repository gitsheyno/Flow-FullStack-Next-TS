const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Excel Reader", type: "Source" },
        { name: "CSV Reader", type: "Source" },
        { name: "Column Filter", type: "Manipulator" },
        { name: "CSV Writer", type: "Predictor" },
        { name: "Excel Writer", type: "Predictor" },
      ],
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.$disconnect();
  }
}

main();
