import React, { useEffect, useState } from "react";
import { DEFAULT_USER, User } from "../../../../api/userService";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import { handleFormData } from "../../../../utils/helper";

interface FormProps {
	type?: string;
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: User | null;
	onSuccess?: (code: number, message: string) => void;
	action?: "create" | "update";
}

const Form = ({ open, type, onClose, onSubmit, data, onSuccess, action }: FormProps) => {
	const { form, setForm } = useFormHandler<User>(
		data ?? null,
		DEFAULT_USER,
		onSubmit,
		open,
		(form: Partial<User>) => ({
			...form,
		}),
	);

	const [existingEmail, setExistingEmail] = useState(false);

	const toFormData = (data: Partial<User>) => {
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

		if (data?.email) setExistingEmail(true);
		setForm(data);
	}, [data]);

	let formHtml = null;
	switch (type) {
		default:
			formHtml = (
				<div>
					<FormInput
						type="text"
						label="Tên người dùng"
						name="username"
						value={form.username}
						disabled
					></FormInput>
					<FormInput
						type="text"
						label="Email"
						name="email"
						value={form.email}
						disabled={existingEmail ? true : false}
						onChange={(e) => setForm({ ...form, email: e })}
					></FormInput>
					<FormInput
						type="text"
						label="Họ & tên"
						name="fullname"
						value={form.fullname}
						onChange={(e) => setForm({ ...form, fullname: e })}
					></FormInput>
					<div className="grid grid-cols-2 gap-4">
						<FormInput
							type="date"
							label="Ngày sinh"
							name="dob"
							value={form.dob}
							onChange={(e) => setForm({ ...form, dob: e })}
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
						type="file"
						label="Avatar"
						name="avatar"
						value={form.avatar}
						onChange={(e) => setForm({ ...form, avatarFile: e })}
					></FormInput>
					<FormInput
						type="textarea"
						label="Địa chỉ"
						name="address"
						value={form.address}
						onChange={(e) => setForm({ ...form, address: e })}
					></FormInput>
				</div>
			);
			break;
	}

	return (
		<GenericDialog
			open={open}
			title={data ? "Chỉnh sửa Người dùng" : "Thêm mới Người dùng"}
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
					onClick: handleSave,
					sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
				},
			]}
		>
			{formHtml}
		</GenericDialog>
	);
};

export default Form;
