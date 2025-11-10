import React, { useEffect, useState } from "react";
import { Company } from "../../../../api/companyService";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { Form } from "react-router-dom";
import { handleFormData } from "../../../../utils/helper";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?:
		| (Company & {
				avatarUrl?: string | null;
				bankAttachmentUrl?: string | null;
		  })
		| null;
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

	const toFormData = (data: Partial<Company>) => {
		const fd = handleFormData(data);
		return fd;
	};

	const handleSave = async () => {
		try {
			// setLoading(true);
			const fd = toFormData(form);
			const res = await onSubmit(fd);
			onSuccess?.(res.code, res.message);
			if (res.code === 1) onClose();
		} catch (err: any) {
			console.log("Error:", err);
		} finally {
			// setLoading(false);
		}
	};

	useEffect(() => {
		if (!data) {
			return;
		}
		setForm(data);
	}, [data]);

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
					onClick: () => {
						handleSave();
					},
					sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
				},
			]}
		>
			<FormInput
				type="text"
				label="Tên công ty"
				name="name"
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e })}
			></FormInput>
			<FormInput
				type="text"
				label="Email"
				name="email"
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e })}
			></FormInput>
			<div className="grid grid-cols-2 gap-4">
				<FormInput
					type="text"
					label="Mã số thuế"
					name="taxCode"
					value={form.taxcode}
					onChange={(e) => setForm({ ...form, taxcode: e })}
				></FormInput>
				<FormInput
					type="text"
					label="Số điện thoại"
					name="phone"
					value={form.phone}
					onChange={(e) => setForm({ ...form, phone: e })}
				></FormInput>
			</div>
			<FormInput
				type="text"
				label="Địa chỉ"
				name="address"
				value={form.address}
				onChange={(e) => setForm({ ...form, address: e })}
			></FormInput>
			<FormInput
				type="file"
				label="Thông tin chuyển khoản"
				name="bank_attachment"
				value={form.bankAttachment}
				onChange={(e) => setForm({ ...form, bankAttachmentFile: e })}
			></FormInput>
		</GenericDialog>
	);
};

export default CompanyForm;
