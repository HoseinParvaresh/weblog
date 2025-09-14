// app/admin/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/modules/AdminDashboard/Sidebar/Sidebar";
import Navbar from "@/components/modules/AdminDashboard/Navbar/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="w-full overflow-hidden">
			{/* sidebar */}
			<Sidebar side="right" />
			<section className="w-full">
				<Navbar admin={true} />
				{/* content */}
				<section className="flex flex-col gap-6 p-6 bg-zinc-100">{children}</section>
			</section>
		</SidebarProvider>
	);
}
