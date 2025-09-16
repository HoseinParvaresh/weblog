"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import StatusBadge from "../DataTable/StatusBadge";
type posts = {
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
};

export const PostsColumns: ColumnDef<posts>[] = [
	{
		id: "select",
		header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: "id",
		cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => <div className="capitalize w-70overflow-hidden">{row.getValue("title")}</div>,
	},
	{
		accessorKey: "author",
		header: "Author id",
		cell: ({ row }) => <div className="capitalize">{row.getValue("author")}</div>,
	},
	{
		accessorKey: "category",
		header: "Category",
		cell: ({ row }) => <div className="capitalize">{row.getValue("category")}</div>,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">
				<StatusBadge status={row.getValue("status")} />
			</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
