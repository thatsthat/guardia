import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import { listAllTags } from "~/db";
import { updateTag } from "~/updateTag";
import { SubmitButton } from "./submitButton";

const tags = await listAllTags();

type Tag = { id: number; name: string };

type PropsType = {
  activeTags: Tag[];
};

export function AppSidebar({ activeTags }: PropsType) {
  console.log(activeTags);
  /* return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Etiquetes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <SidebarMenuItem key={tag.name}>
                  <SidebarMenuButton asChild>
                    <button>
                      <span>{tag.name}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ); */
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Etiquetes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <form action={updateTag}>
                  <input type="hidden" name="id" value={tag.id} />
                  <input
                    type="hidden"
                    name="intent"
                    value={activeTags.includes(tag) ? "disable" : "enable"}
                  />
                  <SidebarMenuItem key={tag.name}>
                    <SubmitButton
                      isActive={activeTags.includes(tag)}
                      name={tag.name}
                    />
                  </SidebarMenuItem>
                </form>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
