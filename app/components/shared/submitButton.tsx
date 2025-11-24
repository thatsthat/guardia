"use client";
import { useFormStatus } from "react-dom";
import { SidebarMenuButton } from "@/components/ui/sidebar";

type PropsType = {
  isActive: boolean;
  name: string;
};

/*
{pending
  ? isActive
    ? "Removing..."
    : "Adding..."
  : isActive
    ? "Remove from favorites"
    : "Add to favorites"}{" "}
*/

export function SubmitButton({ isActive, name }: PropsType) {
  let { pending } = useFormStatus();

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <button
        type="submit"
        onClick={(event) => {
          if (pending) event.preventDefault();
        }}
      >
        <span>{name}</span>
      </button>
    </SidebarMenuButton>
  );
}
