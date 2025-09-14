import { HiMiniBars3 } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Image from "next/image";

export default function Navbar({ admin }: { admin: boolean }) {
	return (
		<div className="flex items-center justify-between shrink-0 w-full h-22 px-5 sm:px-7 bg-white max-lg:border-b max-lg:border-b-black/10 lg:rounded-lg">
			{/* overlay */}
			<div className="mobile-overlay"></div>
			{/* bars icon */}
			{admin ? <SidebarTrigger className="rotate-180 block md:hidden" /> : <HiMiniBars3 className="block md:hidden size-6" />}
			{/* search box */}
			<div className={`relative z-20 hidden ${admin ? "lg:flex" : "md:flex"} items-center justify-between gap-x-4 w-60 bg-black/5 rounded-lg py-1 px-4 h-12`}>
				<input type="text" placeholder=" تیکت ها، سفارش ها و..." className="size-full text-xs placeholder:text-sm outline-none" />
				<CiSearch className="text-sm shrink-0 text-gray-500 size-5 cursor-pointer" />
			</div>
			{/* logo */}
			<Link href={"/"} className="text-2xl text-primary font-MorabbaBold">
				<Image src="/images/logo.webp" width={50} height={50} alt="logo" />
			</Link>
			{/* notification and basket buttons / date */}
			<div className="flex items-center gap-x-5">
				{/* buttons */}
				<div className="flex gap-x-3">
					{/* basket or square */}
					{admin ? <HiOutlineSquares2X2 className="size-6 cursor-pointer" /> : <IoCartOutline className="size-6 cursor-pointer" />}
					{/* notification */}
					<IoNotificationsOutline className="size-6 cursor-pointer" />
				</div>
			</div>
		</div>
	);
}
