"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { stripHtml } from "@/utility/utilityFunction";
import PocketBase from "pocketbase";
interface DynamicFormProps {
	fields: any[];
	record?: any;
	collectionName: string;
	categories: any[];
	onSuccess?: () => void;
}
export default function DynamicForm({ fields, record, collectionName, categories, onSuccess }: DynamicFormProps) {
	const [formData, setFormData] = useState<any>(record || {});
	const [loading, setLoading] = useState(false);

	const category = record && collectionName === "posts" && categories.find((cat) => cat.id === record.category);

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
				return <Input required value={value} onChange={(e) => handleChange(field.name, e.target.value)} />;

			case "bool":
				return (
					<div className="flex items-center space-x-2">
						<Checkbox required checked={!!value} onCheckedChange={(checked) => handleChange(field.name, checked)} />
						<Label>{field.name}</Label>
					</div>
				);

			case "select":
				return (
					<Select required value={value} onValueChange={(val) => handleChange(field.name, val)}>
						<SelectTrigger>
							<SelectValue placeholder="دسته بندی را انتخاب کنید " />
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
					<Select required value={value.name} onValueChange={(val) => handleChange(field.name, val)}>
						<SelectTrigger>
							<SelectValue placeholder={record ? category.name : "دسته بندی را انتخاب کنید "} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{categories?.map((r: any) => (
									<SelectItem key={r.id} value={r.id}>
										{r.name}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				);

			case "file":
				return <Input required type="file" onChange={(e) => handleChange(field.name, e.target.files?.[0])} />;

			case "editor":
				return <Textarea required className="leading-7" value={stripHtml(value)} onChange={(e) => handleChange(field.name, stripHtml(e.target.value))} />;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const pb = new PocketBase("http://127.0.0.1:8090");
		try {
			const data = { ...formData };

			if (collectionName === "posts") {
				data.author = "pzuvwj4mvpler60";
				data.status = "pending";
				data.comment_count = 0;
				data.like_count = 0;
			} else if (collectionName === "users") {
				data.passwordConfirm = data.password;
			}

			if (record) {
				await pb.collection(collectionName).update(record.id, data);
			} else {
				await pb.collection(collectionName).create(data);
			}

			alert("ذخیره شد ✅");
			onSuccess?.();
		} catch (err: any) {
			console.error(err);
			alert("خطا: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
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
