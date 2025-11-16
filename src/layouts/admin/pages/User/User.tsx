import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Table from "./Table";
import Form from "./Form";
import {
	createUser,
	deleteUser,
	getUser,
	updateUser,
	User as UserObject,
} from "../../../../api/userService";
import { useUsers } from "../../../../hooks/useUsers";
import ErrorPage from "../../../common/ErrorPage";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";

type FormAction = "create" | "update";

const User = () => {
	const { showSnackbar } = useSnackbar();

	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);

	const { users, loading, error, setUsers, total, totalPages } = useUsers(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<UserObject | null>(null);
	const [formAction, setFormAction] = useState<FormAction>("create");

	const [detailData, setDetailData] = useState<UserObject | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: FormData) => {
		try {
			const res = await createUser(data as any);
			if (res?.code === 1 && res?.result) {
				setUsers([...users, res.result]);
				setOpenForm(false);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};
	const handleUpdate = async (id: number, data: FormData) => {
		try {
			const res = await updateUser(id, data as any);
			if (res?.code === 1 && res?.result) {
				setUsers(users.map((p) => (p.id === res.result.id ? res.result : p)));
				setOpenForm(false);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};
	const handleDelete = async (id: number) => {
		try {
			const res = await deleteUser(id);
			if (res?.code === 1) {
				setUsers(users.filter((p) => p.id !== id));
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	const handleDetail = async (id: number) => {
		if (!id) return { code: -1, message: "Missing ID to get detail" };
		try {
			const res = await getUser(id);
			if (res?.code === 1 && res?.result) {
				setDetailData(res.result);
				setDetailOpen(true);
			}
			return showSnackbar({
				message: res?.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (err: any) {
			return showSnackbar({
				message: err?.response?.data?.message || err.message,
				severity: "error",
			});
		}
	};

	let content = (
		<div>
			<CommonLayout title="Thông tin Người dùng" width={60}>
				<div className="category-list">
					<Table
						users={users}
						onEdit={(perm) => {
							setEditData(perm);
							setFormAction("update");
							setOpenForm(true);
						}}
						onDelete={handleDelete}
						onDetail={handleDetail}
						page={page}
						setPage={setPage}
						totalPages={totalPages}
					></Table>
				</div>
			</CommonLayout>
			<Form
				open={openForm}
				onClose={onCloseForm}
				action={formAction}
				data={editData || undefined}
				onSubmit={(body) => {
					switch (formAction) {
						case "create":
							return handleCreate(body as FormData);
						case "update":
							return handleUpdate(editData?.id!, body as FormData);
						default:
							return Promise.resolve({ code: -1, message: "Thiếu dữ liệu" });
					}
				}}
			></Form>
		</div>
	);

	if (loading) {
		content = <div className="my-10 mx-30">Đang tải thông tin người dùng...</div>;
	}
	if (error) {
		content = <ErrorPage message="Không thể tải thông tin người dùng"></ErrorPage>;
	}
	return <BaseLayout>{content}</BaseLayout>;
};

export default User;
