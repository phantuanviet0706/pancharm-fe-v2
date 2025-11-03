import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import FieldDisplay from "../../../../components/FieldDisplay";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import PlaceIcon from "@mui/icons-material/Place";
import { Button } from "@mui/material";
import Form from "./Form";
import { Company as CompanyObject } from "../../../../api/companyService";
import { useCompany } from "../../../../hooks/useCompany";
import FilePreviewButton from '../../../../components/FilePreviewButton';

const Company = () => {
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const [openForm, setOpenForm] = useState(false);
	const [editData, setEditData] = useState<CompanyObject | null>(null);

	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleCreate = async (data: Partial<CompanyObject>) => {};
	const handleUpdate = async (data: CompanyObject) => {};

	// if (loading) return <p>Loading ...</p>;
	// if (error) return <p>Failed to load company</p>;

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
						onClick={() => {
							setOpenForm(true);
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
						label="Mã số thuế"
						value="001201004444"
						icon={<Icon name="taxCode" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Địa chỉ"
						value="92 Đặng Thùy Trâm, Phường Bình Lợi Trung, TP.HCM"
						icon={<Icon name="location" />}
						inline
					></FieldDisplay>
					<div className="field-display-container">
						<div className="field-display-wrapper">
							<div className={`display-field flex gap-12`}>
								<div
									className={`field-label mb-2 w-[12vw] items-center flex gap-3`}
								>
									<Icon name="bank" />
									<div className="label-content uppercase font-semibold text-[13px] leading-[20px]">
										Thông tin chuyển khoản
									</div>
								</div>
								<div className="field-value line-clamp-1 overflow-hidden text-ellipsis leading-[20px]">
									<FilePreviewButton
										url={"https://pancharm.s3.ap-northeast-1.amazonaws.com/companies/1/avatar/82fe93df-d3f1-4ef4-b4ee-40ac5242b68f-46f98a0b-785d-46d5-9fc2-f68e8cd3fe2d.jpg"}
										title="Thông tin chuyển khoản"
										fileName="bank-attachment"
										startIcon={<Icon name="attachment" />}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CommonLayout>

			<Form
				open={openForm}
				onClose={onCloseForm}
				onSubmit={(data) => handleUpdate({ ...editData, ...data } as CompanyObject)}
				data={editData}
			></Form>
		</BaseLayout>
	);
};

export default Company;
