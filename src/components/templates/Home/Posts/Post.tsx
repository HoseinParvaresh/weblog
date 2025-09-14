import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
export default function Post() {
	return (
		<div className="border-b pt-7 pb-5 space-y-5">
			{/* top => avatar , author , date , title , summery , image */}
			<div className="flex justify-between items-center gap-15">
				{/* right => avatar , author , date , title , summery */}
				<div className="space-y-4">
					{/* avatar , author , date */}
					<Link href={"/"} className="flex items-center gap-1.5 text-xs">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<span>حمید تیموری</span>.<span>2 روز پیش</span>
					</Link>
					{/* title , summery */}
					<Link href={"/"}>
						<p className="font-danaBold text-lg line-clamp-1">خلاقیت میتونه غرقت کنه</p>
						<p className="text-sm text-gray-700 line-clamp-2 mt-2 leading-7">دانلود سریال فکر می‌کنی اگه زودتر از همه حرکت کنی برنده‌ای؟ برای من یه تجربه‌ی گرون بودSharp Objects (اشیاء تیز) با زیرنویس فارسی چسبیده و بدون سانسور؛ معمایی، جنایی و روانشناسانه با بازی امی آدامز. دانلود سریال Sharp Objects (اشیاء تیز) با زیرنویس فارسی چسبیده و بدون سانسور؛ معمایی، جنایی و روانشناسانه با بازی امی آدامز.</p>
					</Link>
				</div>
				{/* left => image */}
				<img className="w-[120px] h-[120px] object-cover" src="/images/no-image.png" alt="no-image" />
			</div>
			{/* bottom => category , icons */}
			<div className="flex justify-between">
				{/* category */}
				<Badge className="px-5 py-1.5" variant="secondary">
					فیلم و سینما
				</Badge>
				{/* icons */}
				<div className="flex items-center gap-10">
					<div className="flex items-center text-sm gap-2 cursor-pointer">
						<IoMdHeartEmpty className="size-7 text-gray-600 hover:text-red-500" />
						<span>5</span>
					</div>
					<div className="flex items-center text-sm gap-2 cursor-pointer">
						<IoChatboxOutline className="size-7 text-gray-600" />
						<span>3</span>
					</div>
					<div className="flex items-center text-sm gap-2 cursor-pointer">
						<CiBookmark className="size-7 text-gray-600" />
						<span>1</span>
					</div>
				</div>
			</div>
		</div>
	);
}
