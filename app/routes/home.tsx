import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import { MoreData } from "@/components/shared/MoreData";
import { Form, redirect } from "react-router";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const keyword = formData.get("search")?.toString() ?? "";
  return redirect(`/?keyword=${encodeURIComponent(keyword)}`);
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") ?? "";
  const lastCursor = url.searchParams.get("cursor") ?? null;
  const more = url.searchParams.get("more") ?? "0";

  const chapters = await prisma.chapter.findMany({
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: parseInt(lastCursor),
      },
    }),
    take: 5,
    where: keyword ? { title: { contains: keyword, mode: "insensitive" } } : {},
  });
  //const newCursor = chapters[chapters.length - 1].id;
  return { chapters, more };
}

export function ServerComponent({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const chapters = loaderData.chapters;

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <Form method="post">
        <div className="flex max-w-sm gap-5 min-w-md">
          <Input type="text" name="search" />
          <Button type="submit">Search</Button>
        </div>
      </Form>
      {!!chapters.length && (
        <MoreData
          chapters={loaderData.chapters}
          cursor={chapters[chapters.length - 1].id}
          more={loaderData.more}
        />
      )}
    </div>
  );
}
