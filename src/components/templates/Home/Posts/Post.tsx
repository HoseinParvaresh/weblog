import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Link from "next/link";
import { stripHtml } from "@/utility/utilityFunction";
import PocketBase from 'pocketbase';

interface Posts {
	id : string,
	title : string,
	summary : string,
	category : string,
	author : string,
	like_count : number,
	comment_count : number
}

export default async function Post({id,title,summary,like_count,comment_count,category,author} : Posts) {

	const pb = new PocketBase('http://127.0.0.1:8090');

	const categoryRecord = await pb.collection('categories').getOne(category);
	const usersRecord = await pb.collection('users').getOne(author);
		
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
						<span>{usersRecord.name}</span>.<span>2 روز پیش</span>
					</Link>
					{/* title , summery */}
					<Link href={`/posts/${id}`}>
						<p className="font-danaBold text-lg line-clamp-1">{title}</p>
						<p className="text-sm text-gray-700 line-clamp-2 mt-2 leading-7">{stripHtml(summary)}</p>
					</Link>
				</div>
				{/* left => image */}
				<img className="w-[120px] h-[120px] object-cover" src="/images/no-image.png" alt="no-image" />
			</div>
			{/* bottom => category , icons */}
			<div className="flex justify-between">
				{/* category */}
				<Badge className="px-5 py-1.5" variant="secondary">
					{categoryRecord.name}
				</Badge>
				{/* icons */}
				<div className="flex items-center gap-10">
					<div className="flex items-center text-sm gap-2 cursor-pointer">
						<IoMdHeartEmpty className="size-7 text-gray-600 hover:text-red-500" />
						<span>{like_count}</span>
					</div>
					<div className="flex items-center text-sm gap-2 cursor-pointer">
						<IoChatboxOutline className="size-7 text-gray-600" />
						<span>{comment_count}</span>
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
