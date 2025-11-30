import React, { useRef, useState } from "react";
import { DEFAULT_ORDER, Order } from "../../../../api/orderService";
import { useFormHandler } from "../../../../hooks/useFormHandler";
import GenericDialog from "../../../../components/GenericDialog";
import FormInput from "../../../../components/FormInput";
import { formatVND } from "../../../../utils/helper";

interface FormProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: any) => any;
	data?: Order;
	onSuccess?: (code: number, message: string) => void;
	action?: "create" | "update" | "cancel" | "confirm";
}

const Form = ({ open, onClose, onSubmit, data, onSuccess, action = "create" }: FormProps) => {
	const { form, setForm } = useFormHandler<Order>(
		data ?? null,
		DEFAULT_ORDER,
		onSubmit,
		open,
		(form: Partial<Order>) => ({
			...form,
		}),
	);

	const [catOpts, setCatOpts] = useState<any[]>([]);
	const [loadingCats, setLoadingCats] = useState(false);
	const searchTimerRef = useRef<number | null>(null);

	const handleSave = async () => {
		try {
			const payload: Partial<Order> = {
				...form,
			};

			const fd = payload;
			const res = await onSubmit(fd);
			onSuccess?.(res.code, res.message);
			if (res.code === 1) onClose();
		} catch (err) {
			console.error(err);
		}
	};

	let formContent: React.ReactNode = null;
	let title = "";

	switch (action) {
		case "confirm":
			title = "Xác nhận đơn hàng";
			formContent = (
				<>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="flex flex-col gap-1">
							<span className="text-xs text-gray-500">Mã đơn hàng</span>
							<span className="font-semibold">{data?.slug}</span>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-xs text-gray-500">Tên khách hàng</span>
							<span className="font-medium">{data?.shippingAddress?.recipientName}</span>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-xs text-gray-500">Tổng tiền</span>
							<span className="font-semibold">
								{formatVND(data?.totalPrice ?? 0)}₫
							</span>
						</div>

						<div className="flex flex-col gap-1">
							<span className="text-xs text-gray-500">Trạng thái hiện tại</span>
							<span className="inline-flex items-center rounded px-2 py-0.5 text-xs bg-amber-50 text-amber-700 border border-amber-200">
								{data?.status}
							</span>
						</div>
					</div>

					<FormInput
						type="textarea"
						label="Ghi chú xử lý đơn"
						name="note"
						// value={form?.note}
						onChange={(v) => setForm((f) => ({ ...f, note: v }))}
						placeholder="VD: Đã gọi xác nhận với khách, đổi địa chỉ giao; khách dặn gói quà; ưu tiên giao buổi tối..."
					/>
				</>
			);
			break;
	}

	return (
		<GenericDialog
			open={open}
			title={title}
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
			{formContent}
		</GenericDialog>
	);
};

export default Form;
