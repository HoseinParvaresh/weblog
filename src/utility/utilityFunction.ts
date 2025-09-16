import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PostsColumns } from "@/components/templates/admin-dashboard/columns/postsColumn";
import { UsersColumns } from "@/components/templates/admin-dashboard/columns/usersColumn";
import { CategoryColumns } from "@/components/templates/admin-dashboard/columns/categoriesColumn";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
function findColumns(params : string) {
  const columnsMap = {
      posts: PostsColumns,
      users : UsersColumns,
      // comments : CommentsColumns,
      categories : CategoryColumns
    };
    return columnsMap[params]
}

export {cn,findColumns}
