import React from "react";
import { Company } from "../../../../api/companyService";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { Form } from "react-router-dom";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: Company | null;
	onSuccess?: (code: number, message: string) => void;
}

const CompanyForm = ({ open, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm, handleSubmit } = useFormHandler<Company>(
		data ?? null,
		{},
		onSubmit,
		open,
		(form: Partial<Company>) => ({
			...form,
		}),
	);

	return (
		<GenericDialog
			open={open}
			title={"Chỉnh sửa Thông tin công ty"}
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
			<FormInput type="text" label="Tên công ty" name="name" value={form.name}></FormInput>
			<FormInput type="text" label="Mã số thuế" name="tax_code" value={form.taxcode}></FormInput>
			<FormInput type="text" label="Địa chỉ" name="address" value={form.address}></FormInput>
			<FormInput
				type="file"
				label="Thông tin chuyển khoản"
				name="bank_attachment"
				value={form.bankAttachment}
			></FormInput>
		</GenericDialog>
	);
};

export default CompanyForm;
