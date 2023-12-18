import prisma from "./prisma-db";

export async function fetchAll(query: string) {
  let data;
  if (!query) {
    data = await prisma.category.findMany();
  } else {
    data = await prisma.category.findMany({
      where: { id: query },
    });
  }

  return data;
}
