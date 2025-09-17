import DynamicTable from "@/components/admin-dashboard/table/DynamicTable";
import { findColumns, fetchCollection } from "@/utility/utilityFunction";
import { ColumnDef } from "@tanstack/react-table";

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

type Collection = "posts" | "users" | "comments" | "categories";

function mapCategoriesToPosts(posts: Posts[], categories: Category[]) {
  const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat.name]));
  return posts.map(post => ({
    ...post,
    category: categoryMap[post.category] ?? "نامشخص",
  }));
}

export default async function Page({ params }: PageParams) {
  const { collection } = params;

  try {
    const data = await fetchCollection(collection);
    let items = data.items;

    if (collection === "posts") {
      const categoriesData = await fetchCollection("categories");
      items = mapCategoriesToPosts(items, categoriesData.items as Category[]);
    }

    const columns = findColumns(collection as Collection);

    return (
      <div dir="ltr" className="bg-white px-5 py-3 rounded-lg">
        <DynamicTable data={items} columns={columns as ColumnDef<Posts, unknown>[]} />
      </div>
    );
  } catch (error) {
    return <h1>404</h1>;
  }
}
