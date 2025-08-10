import Image from "next/image";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Account 1",
    url: "#",
    icon: { src: "/Solana.png", alt: "Solana", width: 28, height: 28 },
  },
];

export function SidebarNav() {
  return (
    <SidebarProvider>
      <Sidebar className="w-56 h-full min-h-screen border-r border-gray-100 bg-white">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
          </SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center gap-2 px-2 py-1">
                    <Image
                      src={item.icon.src}
                      alt={item.icon.alt}
                      width={item.icon.width}
                      height={item.icon.height}
                    />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
