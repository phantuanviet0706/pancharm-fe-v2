import React from "react";
import BaseLayout from "../../components/BaseLayout";
import { Avatar, Button, Link } from "@mui/material";

const UserInfo = () => {
	return (
		<BaseLayout>
			<div className="profile-container flex justify-center my-25">
				<div className="profile-layout text-center">
					<div>
						<div className="profile-avatar">
							<Avatar
								sx={{ width: "12em", height: "12em" }}
								src="https://cdn.pixabay.com/photo/2015/05/15/09/28/head-723540_640.jpg"
							/>
						</div>
						<div className="profile-avatar-btn">
							<Button className="">
								Chọn file ảnh
							</Button>
						</div>
					</div>
					<div className="profile-info-wrapper my-5">
						
					</div>
				</div>
			</div>
		</BaseLayout>
	);
};

export default UserInfo;
