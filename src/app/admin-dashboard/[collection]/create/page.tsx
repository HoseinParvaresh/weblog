import PocketBase from "pocketbase";
import DynamicForm from "@/components/modules/AdminDashboard/DynamicForms/DynamicForms";
import { fetchCollection } from "@/utility/utilityFunction";

type Props = { params: { collection: string } };

export default async function CreatePage({ params }: Props) {
	const collectionName = params.collection;
	const pb = new PocketBase("http://127.0.0.1:8090");
	let categories = [];

	try {
		await pb.collection("_superusers").authWithPassword("hoseinp753@gmail.com", "hosein2681");
		const collection = await pb.collections.getOne(`${collectionName}`);
		if (!collection || collectionName === "comments") return <h1>404</h1>;

		if (collectionName === "posts") {
			categories = await fetchCollection("categories");
		}

		const fields = collection.fields || [];

		const hiddenFields = ["id", "author", "comment_count", "like_count", "created", "updated", "status", "tokenKey", "image", "avatar"];
		const visibleFields = fields.filter((field: any) => !hiddenFields.includes(field.name));

		return (
			<div>
				<DynamicForm fields={visibleFields} collectionName={collectionName} categories={categories.items} />
			</div>
		);
	} catch (err) {
		return <h1>404</h1>;
	}
}
