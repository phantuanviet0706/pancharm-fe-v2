import React, { useContext, useEffect, useState } from "react";
import BaseLayout from "../../components/BaseLayout";
import FilePreviewButton from "../../../../components/FilePreviewButton";
import { Button } from "@mui/material";
import CommonLayout from "../../components/CommonLayout";
import Icon from "../../../../components/Icon";
import { useSnackbar } from "../../../../contexts/SnackbarProvider";
import { updateHomeImage, updateHomeVideo } from "../../../../api/configurationService";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { handleFormData } from "../../../../utils/helper";

const Other = () => {
	const { data, setData, loading, error } = useConfiguration();
	const { showSnackbar } = useSnackbar();
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

	useEffect(() => {
		if (data?.config && typeof data.config === "string") {
			try {
				const config = JSON.parse(data.config);
				const url = config.videoUrl;
				setPreviewUrl(url);

				const imgUrl = config.imageUrl;
				setPreviewImageUrl(imgUrl);
			} catch (error) {
				console.error("Error parsing config:", error);
			}
		} else {
			console.error("data.config is not a valid string:", data?.config);
		}
	}, [data]);

	// Hàm chuyển đổi dữ liệu thành FormData
	const toFormData = (data: any) => {
		const fd = new FormData();
		if (data.uploadFile) {
			fd.append("uploadFile", data.uploadFile);
		}
		return fd;
	};

	// Hàm xử lý tải video
	const handleUpload = async (body: any) => {
		try {
			const res = await updateHomeVideo("COMPANY_CONFIG", toFormData(body));
			if (res?.result?.config) {
				const config = JSON.parse(res.result.config);
				const videoUrl = config.videoUrl;
				setPreviewUrl(videoUrl);
			}
			showSnackbar({
				message: res.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (error) {
			showSnackbar({
				message: error?.response?.data?.message || error.message || "Có lỗi xảy ra.",
				severity: "error",
			});
		}
	};

	// Hàm xử lý tải ảnh
	const handleUploadImage = async (body: any) => {
		try {
			const res = await updateHomeImage("COMPANY_CONFIG", toFormData(body));
			if (res?.result?.config) {
				const config = JSON.parse(res.result.config);
				const imageUrl = config.imageUrl;
				setPreviewImageUrl(imageUrl);
			}
			showSnackbar({
				message: res.message || "Cập nhật thành công",
				severity: "success",
			});
		} catch (error) {
			showSnackbar({
				message: error?.response?.data?.message || error.message || "Có lỗi xảy ra.",
				severity: "error",
			});
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isImage: boolean) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);

			const body = { uploadFile: selectedFile };
			if (isImage) {
				handleUploadImage(body);
			} else {
				handleUpload(body);
			}
		}
	};

	return (
		<BaseLayout>
			<CommonLayout title="Nguồn dữ liệu khác" className="company-page">
				<div className="field-display-container">
					<div className="field-display-wrapper grid gap-4">
						{/* Video màn hình chính */}
						<div className={`display-field flex gap-12 relative`}>
							<div className={`field-label mb-2 w-[12vw] items-center flex gap-3`}>
								<Icon name="bank" />
								<div className="label-content uppercase font-semibold text-[13px] leading-[20px]">
									Video màn hình chính
								</div>
							</div>
							<div
								className="field-value line-clamp-1 overflow-hidden text-ellipsis leading-[20px] flex gap-4"
								style={{
									width: "calc(100% - 12vw)",
								}}
							>
								<FilePreviewButton
									url={previewUrl}
									title="Xem tệp đã tải lên"
									fileName={file?.name}
									mimeType="video"
									label="Xem preview"
								/>

								<input
									id="uploadInput"
									name="uploadVideoFile"
									type="file"
									accept="video/*"
									style={{ display: "none" }}
									onChange={(e) => handleFileChange(e, false)}
								/>

								<Button
									variant="outlined"
									onClick={() => document.getElementById("uploadInput")?.click()}
									sx={{
										width: "10em",
									}}
								>
									Tải video lên
								</Button>
							</div>
						</div>

						{/* Ảnh câu chuyện thương hiệu */}
						<div className={`display-field flex gap-12 relative`}>
							<div className={`field-label mb-2 w-[12vw] items-center flex gap-3`}>
								<Icon name="bank" />
								<div className="label-content uppercase font-semibold text-[13px] leading-[20px]">
									Ảnh câu chuyện thương hiệu
								</div>
							</div>
							<div
								className="field-value line-clamp-1 overflow-hidden text-ellipsis leading-[20px] flex gap-4"
								style={{
									width: "calc(100% - 12vw)",
								}}
							>
								<FilePreviewButton
									url={previewImageUrl}
									title="Xem tệp đã tải lên"
									fileName={file?.name}
									label="Xem preview"
								/>

								<input
									id="uploadImage"
									name="uploadImageFile"
									type="file"
									accept="image/*"
									style={{ display: "none" }}
									onChange={(e) => handleFileChange(e, true)}
								/>

								<Button
									variant="outlined"
									onClick={() => document.getElementById("uploadImage")?.click()}
									sx={{
										width: "10em",
									}}
								>
									Tải ảnh lên
								</Button>
							</div>
						</div>
					</div>
				</div>
			</CommonLayout>
		</BaseLayout>
	);
};

export default Other;
