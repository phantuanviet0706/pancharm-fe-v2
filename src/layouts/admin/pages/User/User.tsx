import React from "react";
import BaseLayout from "../../components/BaseLayout";
import { Form } from "react-router-dom";
import CommonLayout from "../../components/CommonLayout";
import GenericTable from "../../../../components/GenericTable";
import ActionMenu from "../../../../components/ActionMenu";

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
	return (
		<BaseLayout>
			<CommonLayout title="Thông tin Người dùng" width={60}>
				<div className="category-list">
					<GenericTable
						data={ROWS}
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
							{ key: "username", label: "Tên người dùng" },
							{ key: "email", label: "Email" },
							{ key: "phone", label: "Số điện thoại" },
							{ key: "status", label: "Trạng thái" },
							{
								key: "actions",
								label: "Thao tác",
								align: "right",
								width: "100px",
								headerStyle: { marginRight: "10px" },
								render: (row) => (
									<ActionMenu
										actions={[
											{
												label: "Edit",
												onClick: () => {
													// onEdit(row)
												},
											},
											{
												label: "Delete",
												onClick: () => {
													// onDelete(row?.id ? row.id : 0)
												},
												color: "red",
											},
										]}
									/>
								),
							},
						]}
					></GenericTable>
				</div>
			</CommonLayout>
		</BaseLayout>
	);
};

export default User;
