import { PrismaClient, Prisma } from "../app/generated/prisma/client.js";
import { faker } from "@faker-js/faker";

interface Chapter {
  title: string;
  aired: Date;
  summary: string;
  url: string;
}

function createChapter(seed: number): Chapter {
  faker.seed(seed);
  return {
    title: faker.lorem.sentence(4),
    aired: faker.date.anytime(),
    summary: faker.lorem.paragraph(2),
    url: faker.internet.url(),
  };
}

export function createChapters(numChapters: number = 5): Array<Chapter> {
  return Array.from({ length: numChapters }, (elem, ind) => createChapter(ind));
}

const prisma = new PrismaClient();

const userData: Prisma.ChapterCreateInput[] = createChapters(30);

export async function main() {
  for (const u of userData) {
    await prisma.chapter.create({ data: u });
  }
}

main();
