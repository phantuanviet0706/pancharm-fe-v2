import React from "react";
import NavItem, { NavItemObject } from "./NavItem";

export interface NavGroupObject {
	id: string;
	name: string;
	subtitle?: string;
	type: "group";
	children: NavItemObject[];
}

export interface NavGroupProps {
	item: NavGroupObject;
}

const NavGroup = ({ item }: NavGroupProps) => {
	return (
		<div className="nav-group-container pb-[8px] px-[30px]">
			<div className="nav-group-header pb-[15px] pt-[10px]">
				<div className="nav-title uppercase text-[13px] text-[var(--color-card-bg)] font-semibold">
					{item.name}
				</div>
				<div className="nav-sub-title text-[11px] text-[var(--color-card-light)]">
					{item.subtitle}
				</div>
			</div>

			<div className="nav-group-content">
				{item.children?.filter(Boolean).map((child) => (
					<NavItem key={`${item.id}:${child.id}`} item={child} />
				))}
			</div>
		</div>
	);
};

export default NavGroup;
