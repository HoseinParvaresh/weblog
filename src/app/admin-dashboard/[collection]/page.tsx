import DataTable from "@/components/templates/admin-dashboard/DataTable/DataTable";
import { findColumns } from "@/utility/utilityFunction";

interface PageParams {
  params: {
    collection: string;
  };
}
export interface Category {
  id: string;
  name: string;
  slug: string;
}
export interface Posts {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  summary: string;
  image: string;
  status: "approved" | "pending" | "rejected";
  comment_count: number;
  like_count: number;
  created: string;
  updated: string;
}

// helper: گرفتن دیتا از PocketBase
async function fetchCollection(collection: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/${collection}/records`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

// helper: تبدیل category id → name
function mapCategoriesToPosts(posts: Posts[], categories: Category[]) {
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.id, cat.name])
  );
  return posts.map((post) => ({
    ...post,
    category: categoryMap[post.category] || "نامشخص",
  }));
}

export default async function Page({ params }: PageParams) {
  try {
    const data = await fetchCollection(params.collection);
    let dataWithRelations = data.items;

    if (params.collection === "posts") {
      const categories = await fetchCollection("categories");
      dataWithRelations = mapCategoriesToPosts(
        data.items,
        categories.items as Category[]
      );
    }

    const columns = findColumns(params.collection);

    return (
      <div dir="ltr" className="bg-white px-5 py-3 rounded-lg">
        <DataTable data={dataWithRelations} columns={columns} />
      </div>
    );
  } catch (error) {
    return <h1>not found</h1>;
  }
}
