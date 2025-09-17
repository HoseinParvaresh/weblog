import Post from "./Post";
import PocketBase from "pocketbase";

export default async function Posts() {
	const pb = new PocketBase("http://127.0.0.1:8090");
	const records = await pb.collection("posts").getFullList();
	console.log(records);

	return (
		<div className="flex-[0_0_58.333333333333336%] max-w-[58.333333333333336%]">
			{records.map((r) => {
				const postData = {
					id: r.id,
					title: r.title,
					summary: r.summary,
					category: r.category || "",
					author: r.author || "",
                    like_count: r.like_count || 0,
                    comment_count: r.comment_count || 0
				};
				return <Post key={r.id} {...postData} />;
			})}
		</div>
	);
}
