import React from "react";
import BaseLayout from "../../components/BaseLayout";
import FieldDisplay from "../../../../components/FieldDisplay";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import PlaceIcon from "@mui/icons-material/Place";
import { Button } from "@mui/material";

const Company = () => {
	return (
		<BaseLayout
			headers={
				<div className="side-btn absolute right-0 mr-10 top-2">
					<Button
						sx={{
							border: "1px solid #e4c6b9",
							backgroundColor: "var(--color-cream-bg)",
							color: "var(--color-card-bg)",
							paddingInline: "15px",
							fontWeight: 600,
							borderRadius: "10px",
							boxShadow: "0 0 0 rgba(0,0,0,0)",
							transition: "all 0.25s ease",
							"&:hover": {
								backgroundColor: "rgba(180,92,78,0.12)",
								boxShadow: "0 4px 10px rgba(180,92,78,0.25)",
								borderColor: "rgba(180,92,78,0.45)",
								transform: "translateY(-1px)",
							},
						}}
					>
						<div className="">Chỉnh sửa</div>
					</Button>
				</div>
			}
		>
			<CommonLayout title="Thông tin công ty" className="company-page">
				<div className="grid grid-cols-1 gap-4">
					<FieldDisplay
						label="Tên công ty"
						value="Pancharm"
						icon={<Icon name="pancharm" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Địa chỉ"
						value="92 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP.HCM"
						icon={<Icon name="location" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Mã số thuế"
						value="001201004444"
						icon={<Icon name="taxCode" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Thông tin chuyển khoản"
						icon={<Icon name="bank" />}
						inline
					></FieldDisplay>
				</div>
			</CommonLayout>
		</BaseLayout>
	);
};

export default Company;
