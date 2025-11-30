import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import ErrorPage from "../../../common/ErrorPage";
import CommonLayout from "../../components/CommonLayout";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import { useOrders } from "../../../../hooks/useOrders";
import { Order as OrderObject, updateOrderStatus } from "../../../../api/orderService";
import Table from "./Table";
import { OrderStatus } from "../../../../constants/orderStatus";

type FormAction = "";

const Order = () => {
	const { showSnackbar } = useSnackbar();

	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);
	const { orders, loading, error, setOrders, total, totalPages } = useOrders(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<OrderObject | null>(null);
	const [formAction, setFormAction] = useState<FormAction>("");

	const [detailData, setDetailData] = useState<OrderObject | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);
	
	// Xử lý chức năng
	const handleDetail = async (id: number) => {
		const order = orders.find((c) => c.id === id);
		if (order) {
			setDetailData(order);
			setDetailOpen(true);
		}
	};

	const handleConfirm = async (order: OrderObject) => {
		if (!order) {
			return showSnackbar({
				message: "Đơn hàng không hợp lệ",
				severity: "error",
			});
		}

		if (order.status != OrderStatus.PROCESSING) {
			return showSnackbar({
				message: "Chỉ có thể xác nhận đơn hàng đang xử lý",
				severity: "error",
			});
		}

		try {
			const res = await updateOrderStatus({
				id: Number(order.id),
				status: OrderStatus.CONFIRMED,
				// description: "",
				// userId?: 1,
			});
		} catch (error) {
			return showSnackbar({
				message: "Xác nhận đơn hàng thất bại",
				severity: "error",
			});
		}
	}

	const handleCancel = async (order: OrderObject) => {
		if (!order) {
			return showSnackbar({
				message: "Đơn hàng không hợp lệ",
				severity: "error",
			});
		}
		if (order.status != OrderStatus.PROCESSING) {
			return showSnackbar({
				message: "Chỉ có thể hủy đơn hàng đang xử lý",
				severity: "error",
			});
		}
		try {
		} catch (error) {
			return showSnackbar({
				message: "Hủy đơn hàng thất bại",
				severity: "error",
			});
		}
	}

	const handleAction = (type: string, order: OrderObject) => {
		switch (type) {
			case "detail":
				handleDetail(order?.id ?? 0);
				break;
			case "confirm":
				handleConfirm(order);
				break;
			case "cancel":
				handleCancel(order);
				break;
		}
	}

	let content = (
		<>
			<CommonLayout title="Thông tin Đơn hàng" width={65}>
				<div className="order-list">
					<Table
						orders={orders}
						totalPages={totalPages}
						page={page}
						setPage={setPage}
						onAction={handleAction}
					></Table>
				</div>
			</CommonLayout>

			{/* <Form></Form> */}
		</>
	);

	if (loading) {
		content = <div className="my-10 mx-30">Đang tải thông tin đơn hàng...</div>;
	}
	if (error) {
		content = <ErrorPage message="Không thể tải thông tin đơn hàng"></ErrorPage>;
	}

	return (
		<>
			<BaseLayout>{content}</BaseLayout>
		</>
	);
};

export default Order;
