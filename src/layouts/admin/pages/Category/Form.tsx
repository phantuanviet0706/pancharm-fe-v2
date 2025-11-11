import React, { useEffect, useRef, useState } from "react";
import { Category, DEFAULT_CATEGORY, fetchData } from "../../../../api/categoryService";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { useFormHandler } from "../../../../hooks/useFormHandler";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: Category;
	onSuccess?: (code: number, message: string) => void;
}

const Form = ({ open, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm, handleSubmit } = useFormHandler<Category>(
		data ?? null,
		DEFAULT_CATEGORY,
		onSubmit,
		open,
		(form: Partial<Category>) => ({
			...form,
			parentId: form.parentId,
			parentName: form.parentName,
		}),
	);

	const [catOpts, setCatOpts] = useState<any[]>([]);
	const [loadingCats, setLoadingCats] = useState(false);
	const searchTimerRef = useRef<number | null>(null);

	const loadCategories = async (keyword = "") => {
		setLoadingCats(true);
		try {
			const res = await fetchData(keyword ? { keyword } : {});
			console.log(res);
			setCatOpts(
				(res?.result?.content ?? []).map((it: any) => ({ id: it.id, name: it.name })),
			);
		} catch (e) {
			console.error(e);
			setCatOpts([]);
		} finally {
			setLoadingCats(false);
		}
	};

	const handleSearchCategory = (keyword: string) => {
		if (searchTimerRef.current) window.clearTimeout(searchTimerRef.current);
		searchTimerRef.current = window.setTimeout(() => {
			loadCategories(keyword);
		}, 350) as unknown as number;
	};

	useEffect(() => {
		if (open) loadCategories();
	}, [open]);

	useEffect(() => {
		if (!form.parentId) return;
		const exist = catOpts.some((o) => o.id === form.parentId);
		if (!exist) {
			setCatOpts((prev) => [{ id: form.parentId, name: form.parentName || "" }, ...prev]);
		}
	}, [form.parentId, form.parentName]);

	return (
		<GenericDialog
			open={open}
			title={data ? "Chỉnh sửa Danh mục" : "Thêm mới Danh mục"}
			onClose={onClose}
			actions={[
				{
					label: "Đóng",
					variant: "outlined",
					onClick: onClose,
					sx: {
						width: "50%",
						borderColor: "var(--color-card-bg)",
						color: "var(--color-card-bg)",
					},
				},
				{
					label: "Lưu",
					variant: "contained",
					onClick: () =>
						handleSubmit((res) => {
							onSuccess?.(res.code, res.message);
							if (res.code === 1) onClose();
						}),
					sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
				},
			]}
		>
			<div className="grid grid-cols-2 gap-4">
				<FormInput
					type="text"
					label="Tên danh mục"
					name="name"
					value={form.name}
					onChange={(v) => setForm((f) => ({ ...f, name: v }))}
				/>
				<FormInput
					type="text"
					label="Mã danh mục"
					name="slug"
					value={form.slug}
					onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
				/>
			</div>

			<FormInput
				type="autocomplete"
				label="Danh mục cha"
				name="category_id"
				value={form.parentId ? (catOpts.find((o) => o.id === form.parentId) ?? null) : null}
				autocompleteOptions={catOpts}
				loading={loadingCats}
				onSearch={handleSearchCategory}
				valueAs="object"
				optionValueKey="id"
				optionLabelKey="name"
				onChange={(selected) => {
					if (!selected)
						return setForm((f) => ({ ...f, parentId: null as any, parentName: "" }));
					setForm((f) => ({
						...f,
						parentId: selected.id,
						parentName: selected.name ?? "",
					}));
				}}
			/>
		</GenericDialog>
	);
};

export default Form;
