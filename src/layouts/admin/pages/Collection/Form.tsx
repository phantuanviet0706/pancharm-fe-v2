import React from "react";
import GenericDialog from "../../../../components/GenericDialog";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { Collection, DEFAULT_COLLECTION } from "../../../../api/collectionService";
import FormInput from "../../../../components/FormInput";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: Collection;
	onSuccess?: (code: number, message: string) => void;
}

const Form = ({ open, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm, handleSubmit } = useFormHandler<Collection>(
		data ?? null,
		DEFAULT_COLLECTION,
		onSubmit,
		open,
		(form: Partial<Collection>) => ({
			...form,
		}),
	);

	return (
		<GenericDialog
			open={open}
			title={data ? "Chỉnh sửa Bộ sưu tập" : "Thêm mới Bộ sưu tập"}
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
					label="Tên bộ sưu tập"
					name="name"
					value={form.name}
				></FormInput>
				<FormInput
					type="text"
					label="Mã bộ sưu tập"
					name="slug"
					value={form.slug}
				></FormInput>
			</div>
			<FormInput type="textarea" label="Mô tả" name="description"></FormInput>
			<FormInput
				type="file"
				label="Ảnh"
				fileMultiple
				value={form.collectionImages}
			></FormInput>
		</GenericDialog>
	);
};

export default Form;
