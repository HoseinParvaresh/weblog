import PocketBase from "pocketbase";

export default async function page({ params }) {
	const pb = new PocketBase("http://127.0.0.1:8090");

	await pb.collection("_superusers").authWithPassword("hoseinp753@gmail.com", "hosein2681");

	// fetch a paginated collections list
	const collection = await pb.collections.getOne('posts');

	console.log(collection);

	return <div>id - {params.id}</div>;
}
