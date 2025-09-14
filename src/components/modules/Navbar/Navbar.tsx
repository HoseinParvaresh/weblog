import Image from "next/image";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button"
export default function Navbar() {
	return (
		<nav className="flex items-center justify-between px-17 py-3">
			{/* logo */}
			<Image width={50} height={50} src="/images/logo.webp" alt="logo" />
			{/* search box */}
			<div className="flex items-center bg-neutral-100 px-3.5 py-1 rounded-full w-[350px] mr-10">
				<IoSearch className="size-6" />
				<Input className="ring-0 border-none !bg-neutral-100 shadow-none focus-visible:border-none focus-visible:ring-0" type="text" placeholder="جستجو در ویرگول..." />
			</div>
			{/* register buttons */}
			<div className="flex gap-1">
				<Button className="rounded-full" variant="ghost">ورود</Button>
                <Button className="rounded-full bg-sky-700 font-danaBold">ثبت نام</Button>
			</div>
		</nav>
	);
}
