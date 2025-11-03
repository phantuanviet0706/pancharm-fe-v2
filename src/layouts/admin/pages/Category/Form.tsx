import React, { useState } from "react";
import { Category, DEFAULT_CATEGORY } from "../../../../api/categoryService";
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
				></FormInput>
				<FormInput
					type="text"
					label="Mã danh mục"
					name="slug"
					value={form.slug}
				></FormInput>
			</div>
			<FormInput
				type="autocomplete"
				label="Danh mục cha"
				name="category_id"
				value={form.parentId}
				autocompleteOptions={[
					{ id: 1, name: "Danh mục cha 1" },
					{ id: 2, name: "Danh mục con 1" },
				]}
			></FormInput>
		</GenericDialog>
	);
};

export default Form;
