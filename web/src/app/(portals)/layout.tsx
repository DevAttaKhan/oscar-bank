import { sidebarConfig } from "@/components/layout/side-nav/data";
import { SideNav, Topbar } from "@/components/layout";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideNav navItems={sidebarConfig.admin} />
      <div className="w-[calc(100vw_-_256px)] ml-auto ">
        <Topbar title="Overview" userImageUrl="/images/cards.logo.png" />
        <main className="px-10 py-6">{children}</main>
      </div>
    </div>
  );
}