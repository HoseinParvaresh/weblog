// app/admin/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/admin-dashboard/sidebar/Sidebar";
import Navbar from "@/components/admin-dashboard/navbar/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="w-full overflow-hidden">
			{/* sidebar */}
			<Sidebar side="right" />
			<section className="w-full">
				<Navbar />
				{/* content */}
				<section className="flex flex-col gap-6 p-6 bg-zinc-100">{children}</section>
			</section>
		</SidebarProvider>
	);
}
