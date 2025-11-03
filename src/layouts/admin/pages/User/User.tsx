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

const ROWS = [
	{
		id: 1,
		username: "Phan Tuấn Việt",
		email: "vietphan@gmail.com",
		phone: "0987654321",
		avatar: "",
		status: "ACTIVE",
	},
	{
		id: 2,
		username: "Trần Ngọc Hiếu",
		email: "hieutran@gmail.com",
		phone: "0987654321",
		avatar: "",
		status: "ACTIVE",
	},
	{
		id: 3,
		username: "Nguyễn Phương Nam",
		email: "namnguyen@gmail.com",
		phone: "0987654321",
		avatar: "",
		status: "ACTIVE",
	},
	{
		id: 4,
		username: "Dương HỒng Hải",
		email: "haiduong@gmail.com",
		phone: "0987654321",
		avatar: "",
		status: "ACTIVE",
	},
];

const User = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const query = useMemo(() => ({ page, limit: 50, keyword: searchText }), [page, searchText]);

	const { users, loading, error, setUsers, total, totalPages } = useUsers(query);

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<UserObject | null>(null);

	const [detailData, setDetailData] = useState<UserObject | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: Partial<UserObject>) => {
		try {
			const res = await createUser(data as Omit<UserObject, "id">);
			if (res?.code === 1 && res?.result) {
				setUsers([...users, res.result]);
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
		}
	};
	const handleUpdate = async (data: UserObject) => {
		if (!data.id) return { code: -1, message: "Missing ID for update" };
		try {
			const res = await updateUser(data.id, data);
			if (res?.code === 1 && res?.result) {
				setUsers(users.map((p) => (p.id === res.result.id ? res.result.id : p)));
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
		}
	};
	const handleDelete = async (id: number) => {
		try {
			const res = await deleteUser(id);
			if (res?.code === 1) {
				setUsers(users.filter((p) => p.id !== id));
			}
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
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
			return { code: res?.code, message: res?.message };
		} catch (err: any) {
			return {
				code: -1,
				message: err?.response?.data?.message || err.message,
			};
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
				onSubmit={(data) =>
					editData ? handleUpdate({ ...editData, ...data }) : handleCreate(data)
				}
				data={editData}
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
