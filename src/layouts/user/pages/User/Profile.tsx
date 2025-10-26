import React from "react";
import BaseLayout from "../../components/BaseLayout";
import { Avatar, Button, Link } from "@mui/material";

const Profile = () => {
	return (
		<BaseLayout>
			<div className="profile-container flex justify-center my-25">
				<div className="profile-layout text-center">
					<div className="profile-avatar">
						<Avatar
							sx={{ width: "12em", height: "12em" }}
							src="https://cdn.pixabay.com/photo/2015/05/15/09/28/head-723540_640.jpg"
						/>
					</div>
					<div className="profile-wrapper my-5">
						<div className="user-profile-name uppercase text-2xl mb-2 font-bold text-[var(--color-card-bg)]">
							Phan Tuấn Việt
						</div>
						<div>
							<Button
								className="user-profile-btn"
								sx={{
									backgroundColor: "var(--color-card-bg)",
									"&:hover": {
										backgroundColor: "var(--color-card-bg-hover)",
									},
								}}
							>
								<Link
									href="/profile/info"
									sx={{
										color: "var(--color-cream-bg)",
										"&:hover": {
											color: "var(--color-cream-bg-hover)",
										},
									}}
									underline="none"
								>
									Cập nhật hồ sơ
								</Link>
							</Button>
						</div>
						<div className="user-basic-info">

						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default Profile;
