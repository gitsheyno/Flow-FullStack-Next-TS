import prisma from "./prisma-db";

export async function fetchAll(query: string) {
  let data;
  // Check if there's no query provided
  if (!query) {
    data = await prisma.category.findMany();
  } else {
    data = await prisma.category.findMany({
      // Filtering based on the provided ID
      where: { id: query },
    });
  }

  return data;
}
