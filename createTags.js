import { chapters } from "./tags.ts";
import { PrismaClient } from "./app/generated/prisma/client.ts";

const prisma = new PrismaClient();

/* const empty = [];

const finalTags = chapters.reduce((tags, chapter) => {
  chapter.tags.forEach((tag) => {
    if (tags.indexOf(tag) == -1) tags.push(tag);
  });
  return tags;
}, empty);

console.log(finalTags);

 (async () => {
  for (const tag of finalTags) {
    await prisma.tag.create({ data: { name: tag } });
  }
})(); */

(async () => {
  // Assign the tags to each chapter
  for (const chapter of chapters) {
    for (const tag of chapter.tags) {
      console.log(tag);
      await prisma.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          tags: {
            connect: [{ name: tag }],
          },
        },
      });
    }
  }
})();
