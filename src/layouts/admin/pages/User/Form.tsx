import React from "react";
import { DEFAULT_USER, User } from "../../../../api/userService";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { useFormHandler } from "../../../../hooks/useFormHandler";

interface FormProps {
	type?: string;
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => Promise<{ code: number; message: string }>;
	data?: User | null;
	onSuccess?: (code: number, message: string) => void;
}

const Form = ({ open, type, onClose, onSubmit, data, onSuccess }: FormProps) => {
	const { form, setForm, handleSubmit } = useFormHandler<Category>(
		data ?? null,
		DEFAULT_USER,
		onSubmit,
		open,
		(form: Partial<User>) => ({
			...form,
		}),
	);

	let formHtml = null;
	switch (type) {
		default:
			formHtml = formCreate(form);
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
					onClick: () =>
						handleSubmit((res) => {
							onSuccess?.(res.code, res.message);
							if (res.code === 1) onClose();
						}),
					sx: { width: "50%", backgroundColor: "var(--color-card-bg)" },
				},
			]}
		>
			{formHtml}
		</GenericDialog>
	);
};

function formCreate(form: Partial<User>) {
	return (
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
				disabled={form.email ? true : false}
			></FormInput>
			<FormInput
				type="text"
				label="Họ & tên"
				name="fullname"
				value={form.fullname}
			></FormInput>
			<div className="grid grid-cols-2 gap-4">
				<FormInput type="date" label="Ngày sinh" name="dob" value={form.dob}></FormInput>
				<FormInput
					type="text"
					label="Số điện thoại"
					name="phone"
					value={form.phone}
				></FormInput>
			</div>
			<FormInput type="file" label="Avatar" name="avatar" value={form.avatar}></FormInput>
			<FormInput
				type="textarea"
				label="Địa chỉ"
				name="address"
				value={form.address}
			></FormInput>
		</div>
	);
}

export default Form;
