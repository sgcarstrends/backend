import type { ComponentPropsWithoutRef } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { IconType } from "@icons-pack/react-simple-icons";

export const NavSocialMedia = ({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon?: IconType;
  }[];
} & ComponentPropsWithoutRef<typeof SidebarGroup>) => (
  <SidebarGroup {...props}>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map(({ title, url, icon: Icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton asChild size="sm">
              <a href={url} rel="me noreferrer" target="_blank">
                {Icon && <Icon title="" />}
                <span>{title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
