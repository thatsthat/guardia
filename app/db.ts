"use server";

import prisma from "@/lib/prisma";

export async function listAllTags() {
  const tags = await prisma.tag.findMany();
  return tags;
}

export async function getActiveTags(uid: string) {
  const session = await prisma.session.findUnique({
    where: {
      session_uid: uid,
    },
    include: {
      tags: true,
    },
  });
  return session ? session!.tags : [];
}

export async function enableTag(sessionId: string, tagId: number) {
  await prisma.session.upsert({
    where: { session_uid: sessionId },
    update: {
      tags: {
        connect: [{ id: tagId }],
      },
    },
    create: {
      session_uid: sessionId,
      tags: {
        connect: [{ id: tagId }],
      },
    },
  });
}

export async function disableTag(sessionId: string, tagId: number) {
  await prisma.session.upsert({
    where: { session_uid: sessionId },
    update: {
      tags: {
        disconnect: [{ id: tagId }],
      },
    },
    create: {
      session_uid: sessionId,
      tags: {
        connect: [{ id: tagId }],
      },
    },
  });
}

export async function getChapters(keyword: string, cursor: string | null) {
  const chapters = await prisma.chapter.findMany({
    ...(cursor && {
      skip: 1,
      cursor: {
        id: parseInt(cursor),
      },
    }),
    take: 10,
    where: keyword ? { title: { contains: keyword, mode: "insensitive" } } : {},
    select: { id: true, aired: true, title: true, url: true, summary: true },
  });
  return chapters;
}
