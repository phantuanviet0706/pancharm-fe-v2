import React, { useMemo, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import FieldDisplay from "../../../../components/FieldDisplay";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import PlaceIcon from "@mui/icons-material/Place";
import { Button } from "@mui/material";
import Form from "./Form";
import { Company as CompanyObject, updateCompany } from "../../../../api/companyService";
import { useCompany } from "../../../../hooks/useCompany";
import FilePreviewButton from "../../../../components/FilePreviewButton";
import ErrorPage from "../../../common/ErrorPage";

const Company = () => {
	const { data, setData, loading, error } = useCompany();
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	const [openForm, setOpenForm] = useState(false);

	const [detailOpen, setDetailOpen] = useState(false);

	const onCloseForm = () => setOpenForm(false);

	const handleUpdate = async (data: CompanyObject) => {
		try {
			const res = await updateCompany(data);
			if (res?.code === 1) {
				let appData = localStorage.getItem("APP_CONFIG");
				if (appData) {
					appData = JSON.parse(appData);
					if (appData?.company) {
						appData.company = res?.result;
						localStorage.setItem("APP_CONFIG", JSON.stringify(appData));
					}
				}
				// window.location.reload();
			} else {
			}
			return {
				code: res.code,
				message: res.message,
			};
		} catch (error: any) {
			return {
				code: -1,
				message: error?.response?.data?.message || error.message,
			};
		}
	};

	let content = (
		<div>
			<CommonLayout title="Thông tin công ty" className="company-page">
				<div className="grid grid-cols-1 gap-4">
					<FieldDisplay
						label="Tên công ty"
						value={data?.name || ""}
						icon={<Icon name="pancharm" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Email"
						value={data?.email || ""}
						icon={<Icon name="email" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Mã số thuế"
						value={data?.taxcode || ""}
						icon={<Icon name="taxCode" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Số điện thoại"
						value={data?.phone || ""}
						icon={<Icon name="phone" />}
						inline
					></FieldDisplay>
					<FieldDisplay
						label="Địa chỉ"
						value={data?.address || ""}
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
										url={data?.bankAttachment || ""}
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
				onSubmit={(data) => handleUpdate(data)}
				data={data}
			></Form>
		</div>
	);

	if (loading) {
		content = <div className="my-10 mx-30">Đang tải thông tin công ty...</div>;
	}
	if (error) {
		content = <ErrorPage message="Không thể tải thông tin công ty"></ErrorPage>;
	}
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
			{content}
		</BaseLayout>
	);
};

export default Company;
