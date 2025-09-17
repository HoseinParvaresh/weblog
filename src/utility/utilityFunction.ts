import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PostsColumns } from "@/components/templates/admin-dashboard/columns/postsColumn";
import { UsersColumns } from "@/components/templates/admin-dashboard/columns/usersColumn";
import { CategoryColumns } from "@/components/templates/admin-dashboard/columns/categoriesColumn";
import { CommentsColumns } from "@/components/templates/admin-dashboard/columns/commentsColumn";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
function findColumns(params : string) {
  const columnsMap = {
      posts: PostsColumns,
      users : UsersColumns,
      comments : CommentsColumns,
      categories : CategoryColumns
    };
    return columnsMap[params]
}
function stripHtml(html: string): string {
  if (!html) return ""

  let text = html.replace(/<br\s*\/?>/gi, "\n")

  text = text.replace(/<[^>]+>/g, "")
  text = text.replace(/&nbsp;/g, " ")
  text = text.replace(/&amp;/g, "&")
  text = text.replace(/&lt;/g, "<")
  text = text.replace(/&gt;/g, ">")
  text = text.replace(/&quot;/g, '"')
  text = text.replace(/&#39;/g, "'")
  text = text.replace(/&zwnj;/g, " ")

  return text.trim()
}
async function fetchCollection(collection: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/${collection}/records`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Not found");
  return res.json();
}


export {cn,findColumns,stripHtml,fetchCollection}
