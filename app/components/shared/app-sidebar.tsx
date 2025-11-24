import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import { updateTag } from "~/updateTag";
import { SubmitButton } from "./submitButton";

type Tag = { id: number; name: string };

type PropsType = {
  activeTags: Tag[];
  allTags: Tag[];
  sessionId: string;
};

export function AppSidebar({ activeTags, allTags, sessionId }: PropsType) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl">Etiquetes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allTags.map((tag) => (
                <form action={updateTag}>
                  <input type="hidden" name="tagId" value={tag.id} />
                  <input type="hidden" name="sessionId" value={sessionId} />
                  <input
                    type="hidden"
                    name="intent"
                    value={
                      activeTags.some((item) => item.id === tag.id)
                        ? "disable"
                        : "enable"
                    }
                  />
                  <SidebarMenuItem key={tag.name}>
                    <SubmitButton
                      isActive={activeTags.some((item) => item.id === tag.id)}
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
