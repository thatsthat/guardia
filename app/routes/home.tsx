import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import { Form, redirect } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const chapters = await prisma.chapter.findMany({
    where: keyword ? { title: { contains: keyword, mode: "insensitive" } } : {},
  });
  return { chapters };
}

export function ServerComponent({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  console.log(actionData);
  const chapters = loaderData.chapters;

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <Form method="post">
        <div className="flex max-w-sm gap-5 min-w-md">
          <Input type="text" name="search" />
          <Button type="submit">Search</Button>
        </div>
      </Form>

      {chapters.map((chapter) => {
        return (
          <Card className="min-w-md" key={chapter.id}>
            <CardHeader>
              <CardTitle>{chapter.title}</CardTitle>
              <CardDescription>{chapter.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {"Aired: "}
                {new Intl.DateTimeFormat("en-GB").format(
                  new Date(chapter.aired)
                )}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
