import PocketBase from "pocketbase";
import DynamicForm from "@/components/admin-dashboard/forms/DynamicForms";
import { fetchCollection } from "@/utility/utilityFunction";

type Props = { params: { collection: string } };

const HIDDEN_FIELDS = [
  "id",
  "author",
  "comment_count",
  "like_count",
  "created",
  "updated",
  "status",
  "tokenKey",
  "image",
  "avatar",
];

export default async function CreatePage({ params }: Props) {
  const { collection: collectionName } = params;
  const pb = new PocketBase("http://127.0.0.1:8090");
  let categories: any[] = [];

  try {
    await pb.collection("_superusers").authWithPassword(
      "hoseinp753@gmail.com",
      "hosein2681"
    );

    const collection = await pb.collections.getOne(collectionName);
    if (!collection || collectionName === "comments") return <h1>404</h1>;

    if (collectionName === "posts") {
      const categoriesData = await fetchCollection("categories");
      categories = categoriesData.items;
    }

    const visibleFields = (collection.fields || []).filter(
      (field: any) => !HIDDEN_FIELDS.includes(field.name)
    );

    return (
      <div>
        <DynamicForm
          fields={visibleFields}
          collectionName={collectionName}
          categories={categories}
        />
      </div>
    );
  } catch (err) {
    return <h1>404</h1>;
  }
}
