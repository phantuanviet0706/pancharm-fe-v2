import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import CommonLayout from "../../components/CommonLayout";
import Table from "./Table";
import Form from "./Form";
import { User as UserObject } from "../../../../api/userService";
import { useUsers } from "../../../../hooks/useUsers";

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

	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: Partial<UserObject>) => {};
	const handleUpdate = async (data: UserObject) => {};
	const handleDelete = async (id: number) => {};
	const handleDetail = async (id: number) => {};

	// if (loading) return <p>Loading ...</p>;
	// if (error) return <p>Failed to load users</p>;
	return (
		<BaseLayout>
			<CommonLayout title="Thông tin Người dùng" width={60}>
				<div className="category-list">
					<Table
						users={ROWS}
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
		</BaseLayout>
	);
};

export default User;
