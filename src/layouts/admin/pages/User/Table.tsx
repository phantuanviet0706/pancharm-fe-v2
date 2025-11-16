import React from "react";
import { User } from "../../../../api/userService";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";
import { Pagination } from "@mui/material";

interface UserTable {
	users: User[];
	onEdit: (user: User) => void;
	onDelete: (userId: number) => void;
	onDetail: (userId: number) => void;
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
}

const Table = ({ users, onEdit, onDelete, onDetail, totalPages, page, setPage }: UserTable) => {
	return (
		<div>
			<GenericTable
				data={users}
				rowKey={(row) => (row?.id ? row.id : 0)}
				columns={[
					{
						key: "avatar",
						label: "Avatar",
						render: (row) => {
							return (
								<img
									className="user-avatar"
									src={row?.avatar ? row.avatar : "/default-avatar.jpg"}
									alt="Avatar"
								></img>
							);
						},
						width: "5rem",
					},
					{
						key: "username",
						label: "Tên người dùng",
						onClick: (row) => onDetail(row?.id ? row.id : 0),
					},
					{ key: "email", label: "Email" },
					{ key: "phone", label: "Số điện thoại" },
					{ key: "status", label: "Trạng thái" },
					// {
					// 	key: "actions",
					// 	label: "Thao tác",
					// 	align: "right",
					// 	width: "100px",
					// 	headerStyle: { marginRight: "10px" },
					// 	render: (row) => (
					// 		<ActionMenu
					// 			actions={[
					// 				{
					// 					label: "Sửa",
					// 					onClick: () => onEdit(row),
					// 				},
					// 				{
					// 					label: "Xóa",
					// 					onClick: () => onDelete(row?.id ? row.id : 0),
					// 					color: "red",
					// 					acl: row.username != "admin"
					// 				},
					// 			]}
					// 		/>
					// 	),
					// },
				]}
			></GenericTable>

			<div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
				<Pagination
					count={totalPages}
					page={page + 1}
					onChange={(e, value) => setPage(value - 1)}
					color="primary"
				/>
			</div>
		</div>
	);
};

export default Table;
