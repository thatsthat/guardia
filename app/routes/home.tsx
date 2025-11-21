import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";
import { MoreData } from "@/components/shared/MoreData";
import { Form, redirect } from "react-router";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { storage } from "../session";
import { listAllTags, getActiveTags, getChapters } from "../db";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "En Guardia" },
    { name: "description", content: "Llista de capítols d'En Guardia" },
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
  const cookieHeader = request.headers.get("Cookie"); // read cookie header
  const session = await storage.getSession(cookieHeader); // parse cookie header
  const sessionId = session.get("_id");
  const chapters = await getChapters(keyword, lastCursor);
  const activeTags = await getActiveTags(sessionId);
  //const newCursor = chapters[chapters.length - 1].id;
  console.log(sessionId);
  return { activeTags, chapters, more };
}

export function ServerComponent({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const chapters = loaderData.chapters;
  return (
    <SidebarProvider>
      <AppSidebar activeTags={loaderData.activeTags} />
      <SidebarTrigger />
      <div className="w-screen flex flex-col items-center">
        <div className="flex flex-col gap-4 m-10 max-w-md">
          <Form method="post">
            <div className="flex gap-5 sm:min-w-md max-w-md">
              <Input type="text" name="search" />
              <Button type="submit">Search</Button>
            </div>
          </Form>
          {!!chapters.length && (
            <MoreData
              chapters={chapters}
              cursor={chapters[chapters.length - 1].id.toString()}
              more={loaderData.more}
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
