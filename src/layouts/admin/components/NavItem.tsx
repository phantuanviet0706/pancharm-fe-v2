import React from "react";
import Icon from "../../../components/Icon";
import { Link } from "react-router-dom";
import { MaterialIcon } from "../../../utils/materialIcons";

export interface NavItemObject {
	id: string;
	title: string;
	type: "item" | "collapse";
	url: string;
	icon: string;
	muiIcon?: any;
}

export interface NavItemProps {
	item: NavItemObject;
}

const NavItem = ({ item }: NavItemProps) => {
	return [
		<div className="py-2">
			<Link to={item.url} className="flex gap-4">
				<div className="">
					<span className="material-icons-two-tone text-[24px]">
						{item.icon}
					</span>
				</div>
				<div
					className="text-[15px] text-[var(--color-brand-bg)]
				hover:text-[var(--color-card-bg)] leading-[24px]"
				>
					{item.title}
				</div>
			</Link>
		</div>,
	];
};

export default NavItem;
