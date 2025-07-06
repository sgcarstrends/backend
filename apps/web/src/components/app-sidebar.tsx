"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import {
  type IconType,
  SiBluesky,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiX,
} from "@icons-pack/react-simple-icons";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { useQueryState, parseAsString } from "nuqs";
import { BrandLogo } from "@/components/brand-logo";
import { NavSocialMedia } from "@/components/nav-social-media";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
// import { VEHICLE_TYPE_MAP } from "@/constants";
import { slugify } from "@/utils/slugify";
import { sortByName } from "@/utils/sorting";

type Icon = LucideIcon | IconType;

type NavItem = {
  title: string;
  icon?: Icon;
  url: string;
  isActive?: boolean;
  items?: NavSubItem[];
};

type NavSubItem = {
  title: string;
  icon?: Icon;
  url: string;
};

type Nav = {
  [key: string]: NavItem[];
};

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const [month] = useQueryState("month", parseAsString);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <BrandLogo />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map(({ items, ...item }) => (
          <Collapsible
            key={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {item.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {/*<SidebarMenuButton asChild>*/}
                    {/*  <Link href={item.url}>{item.title}</Link>*/}
                    {/*</SidebarMenuButton>*/}
                    {items?.length && (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuSub>
                          {items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={{
                                    pathname: subItem.url,
                                    query: { month },
                                  }}
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Social Media</SidebarGroupLabel>
          <NavSocialMedia items={data.socialMedia} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

const data: Nav = {
  navMain: [
    {
      title: "Car Registrations",
      url: "/cars",
      items: [
        {
          title: "Monthly",
          url: "/cars",
        },
      ],
    },
    {
      title: "Fuel Types",
      url: "/cars/fuel-types",
      items: sortByName(
        [
          { title: "Petrol" },
          { title: "Hybrid" },
          { title: "Electric" },
          { title: "Diesel" },
        ],
        { sortKey: "title" },
      ).map((item) => ({
        ...item,
        url: `/cars/fuel-types/${slugify(item.title)}`,
      })),
    },
    {
      title: "Vehicle Types",
      url: "/cars/vehicle-types",
      items: sortByName(
        [
          { title: "Hatchback" },
          { title: "Sedan" },
          { title: "Multi-purpose Vehicle" },
          { title: "Station-wagon" },
          { title: "Sports Utility Vehicle" },
          { title: "Coupe/Convertible" },
        ],
        { sortKey: "title" },
      ).map((item) => ({
        ...item,
        // TODO: Clean up
        // title: VEHICLE_TYPE_MAP[item.title] ?? item.title,
        url: `/cars/vehicle-types/${slugify(item.title)}`,
      })),
    },
    // TODO: Not ready
    // {
    //   title: "Makes",
    //   url: "/makes",
    //   items: [
    //     {
    //       title: "Popular",
    //       url: "/makes/popular",
    //     },
    //   ],
    // },
    {
      title: "COE",
      url: "/coe",
      items: [
        {
          title: "Historical Results",
          url: "/coe",
        },
        {
          title: "PQP Rates",
          url: "/coe/pqp",
        },
      ],
    },
  ],
  socialMedia: sortByName(
    [
      {
        title: "Facebook",
        url: "https://facebook.com/sgcarstrends",
        icon: SiFacebook,
      },
      {
        title: "Twitter",
        url: "https://twitter.com/sgcarstrends",
        icon: SiX,
      },
      {
        title: "Instagram",
        url: "https://instagram.com/sgcarstrends",
        icon: SiInstagram,
      },
      {
        title: "LinkedIn",
        url: "https://linkedin.com/company/sgcarstrends",
        icon: SiLinkedin,
      },
      {
        title: "GitHub",
        url: "https://github.com/sgcarstrends",
        icon: SiGithub,
      },
      {
        title: "Bluesky",
        url: "https://bsky.app/profile/sgcarstrends.com",
        icon: SiBluesky,
      },
    ],
    { sortKey: "title" },
  ),
};
