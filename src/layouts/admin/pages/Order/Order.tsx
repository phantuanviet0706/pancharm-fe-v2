import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import ErrorPage from "../../../common/ErrorPage";
import CommonLayout from "../../components/CommonLayout";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import { useOrders } from "../../../../hooks/useOrders";
import { Order as OrderObject } from "../../../../api/orderService";
import Table from "./Table";

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
	const handleDetail = async (id: number) => {
		const order = orders.find((c) => c.id === id);
		if (order) {
			setDetailData(order);
			setDetailOpen(true);
		}
	};

	const handleAction = (type: string, order: OrderObject) => {
		switch (type) {
			case "detail":
				handleDetail(order?.id ?? 0);
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
