"use client";

import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DynamicFormProps {
	fields: any[];
	record?: any;
	collectionName: string;
	categories: [];
	onSuccess?: () => void;
}

export default function DynamicForm({ fields, record, collectionName, categories, onSuccess }: DynamicFormProps) {
	const [formData, setFormData] = useState<any>(record || {});
	const [relations, setRelations] = useState<any>({});
	const [loading, setLoading] = useState(false);
	
	console.log(formData);

	const handleChange = (fieldName: string, value: any) => {
		setFormData((prev: any) => ({ ...prev, [fieldName]: value }));
	};

	const renderField = (field: any) => {
		const value = formData[field.name] || "";

		switch (field.type) {
			case "text":
			case "password":
			case "number":
			case "email":
				return <Input value={value} onChange={(e) => handleChange(field.name, e.target.value)} />;

			case "bool":
				return (
					<div className="flex items-center space-x-2">
						<Checkbox checked={!!value} onCheckedChange={(checked) => handleChange(field.name, checked)} />
						<Label>{field.name}</Label>
					</div>
				);

			case "select":
				return (
					<Select value={value} onValueChange={(val) => handleChange(field.name, val)}>
						<SelectTrigger>
							<SelectValue placeholder="انتخاب کنید" />
						</SelectTrigger>
						<SelectContent>
							{field.values?.map((opt: string) => (
								<SelectItem key={opt} value={opt}>
									{opt}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);

			case "relation":
				return (
					<Select value={value} onValueChange={(val) => handleChange(field.name, val)}>
						<SelectTrigger>
							<SelectValue placeholder="انتخاب کنید" />
						</SelectTrigger>
						<SelectContent>
							{!categories
								? relations[field.name]?.map((r: any) => (
										<SelectItem key={r.id} value={r.id}>
											{r.id}
										</SelectItem>
								  ))
								: categories?.map((r: any) => (
										<SelectItem key={r.id} value={r.name}>
											{r.name}
										</SelectItem>
								  ))}
						</SelectContent>
					</Select>
				);

			case "file":
				return <Input type="file" onChange={(e) => handleChange(field.name, e.target.files?.[0])} />;

			case "editor":
				return <Textarea value={value} onChange={(e) => handleChange(field.name, e.target.value)} />;

			case "autodate":
				return <Input type="date" value={value ? value.substring(0, 10) : ""} readOnly />;
		}
	};

	//   const handleSubmit = async (e: React.FormEvent) => {
	//     e.preventDefault()
	//     setLoading(true)
	//     try {
	//       const data = new FormData()
	//       for (const key in formData) {
	//         const val = formData[key]
	//         if (val instanceof File) {
	//           data.append(key, val)
	//         } else {
	//           data.append(key, val)
	//         }
	//       }

	//       if (record) {
	//         await pb.collection(collectionName).update(record.id, data)
	//       } else {
	//         await pb.collection(collectionName).create(data)
	//       }

	//       alert("ذخیره شد ✅")
	//       onSuccess?.()
	//     } catch (err: any) {
	//       console.error(err)
	//       alert("خطا: " + err.message)
	//     } finally {
	//       setLoading(false)
	//     }
	//   }

	return (
		<form className="space-y-4">
			<div className="grid grid-cols-2 gap-4">
				{fields.map((field) => (
					<div key={field.id} className="space-y-2">
						{field.type !== "bool" && <Label>{field.name}</Label>}
						{renderField(field)}
					</div>
				))}
			</div>
			<Button type="submit" disabled={loading}>
				{record ? "ویرایش" : "ایجاد"}
			</Button>
		</form>
	);
}
