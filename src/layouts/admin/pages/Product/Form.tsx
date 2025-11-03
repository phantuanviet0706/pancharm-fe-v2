import React from "react";
import { DEFAULT_PRODUCT, Product } from "../../../../api/productService";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: Product;
	onSuccess?: (code: number, message: string) => void;
}

const Form = ({ open, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm, handleSubmit } = useFormHandler<Product>(
		data ?? null,
		DEFAULT_PRODUCT,
		onSubmit,
		open,
		(form: Partial<Product>) => ({
			...form,
			categoryId: form.categoryId,
			categoryName: form.categoryName,
		}),
	);

	return (
		<GenericDialog
			open={open}
			title={data ? "Chỉnh sửa Sản phẩm" : "Thêm mới Sản phẩm"}
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
					label="Tên sản phẩm"
					name="name"
					value={form.name}
				></FormInput>
				<FormInput
					type="text"
					label="Mã sản phẩm"
					name="slug"
					value={form.slug}
				></FormInput>
			</div>
			<FormInput
				type="autocomplete"
				label="Danh mục"
				name="category_id"
				value={form.categoryId}
				autocompleteOptions={[
					{ id: 1, name: "Danh mục cha 1" },
					{ id: 2, name: "Danh mục con 1" },
				]}
			></FormInput>
			<div className="grid grid-cols-2 gap-4">
				<FormInput
					type="int"
					label="Số lượng"
					name="quantity"
					value={form?.quantity}
				></FormInput>
				<FormInput
					type="int"
					label="Đơn giá"
					name="unit_price"
					value={form?.unitPrice}
				></FormInput>
			</div>
			<FormInput
				type="textarea"
				label="Mô tả"
				name="description"
				value={form.description}
			></FormInput>
			<FormInput type="file" label="Ảnh" fileMultiple value={form.productImages}></FormInput>
		</GenericDialog>
	);
};

export default Form;
