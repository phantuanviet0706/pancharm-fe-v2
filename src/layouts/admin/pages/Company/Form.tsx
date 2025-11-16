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
	onSubmit: (data: any) => any;
	data?: Company | null;
	onSuccess?: (code: number, message: string) => void;
}

const CompanyForm = ({ open, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm } = useFormHandler<Company>(data ?? null, {}, onSubmit, open);

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

		let bankConfigObj: any = {};

		if (typeof data.bankConfig === "string" && data.bankConfig.trim() !== "") {
			bankConfigObj = JSON.parse(data.bankConfig);
		}

		if (typeof data.bankConfig === "object" && data.bankConfig !== null) {
			bankConfigObj = data.bankConfig;
		}

		setForm({
			...data,
			bankName: bankConfigObj.bankName ?? bankConfigObj.bank_name ?? data.bankName ?? "",
			bankAccountHolder:
				bankConfigObj.bankAccountHolder ??
				bankConfigObj.bank_account_holder ??
				data.bankAccountHolder ??
				"",
			bankNumber:
				bankConfigObj.bankNumber ?? bankConfigObj.bank_number ?? data.bankNumber ?? "",
		});
	}, [data, setForm]);

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
			<div className="grid grid-cols-3 gap-4">
				<FormInput
					type="text"
					label="Tên ngân hàng"
					name="bankName"
					value={form.bankName}
					onChange={(e) => setForm({ ...form, bankName: e })}
				></FormInput>
				<FormInput
					type="text"
					label="Chủ tài khoản"
					name="bankAccountHolder"
					value={form.bankAccountHolder}
					onChange={(e) => setForm({ ...form, bankAccountHolder: e })}
				></FormInput>
				<FormInput
					type="text"
					label="Số tài khoản"
					name="bankNumber"
					value={form.bankNumber}
					onChange={(e) => setForm({ ...form, bankNumber: e })}
				></FormInput>
			</div>
		</GenericDialog>
	);
};

export default CompanyForm;
