"use server";

import { enableTag, disableTag } from "~/db";

export async function updateTag(formData: FormData) {
  const intent = formData.get("intent");
  const tagId = parseInt(formData.get("tagId") as string);
  const sessionId = formData.get("sessionId") as string;

  if (intent === "disable") {
    await disableTag(sessionId, tagId);
  } else {
    await enableTag(sessionId, tagId);
  }
  console.log(formData.get("intent"));
}
