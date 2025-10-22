import React from "react";

export interface UserNavProps {
    settings: Array<Object>;
}

const UserNav = ({settings}: UserNavProps) => {
	return (
		<div className="p-3">
			{settings.map((item, idx) => (
				<>
					<a
						href={item.href}
						className="block rounded-lg px-3 py-2 text-sm text-white/95 hover:bg-black/10 uppercase text-center"
						style={
							item?.active
								? {
										color: "var(--color-card-bg)",
										backgroundColor: "var(--color-cream-bg)",
										borderRadius: "0.5rem",
										fontWeight: "bolder",
									}
								: {}
						}
					>
						{item?.label}
					</a>

					{idx != settings.length - 1 && (
						<div className="my-1 h-[1px] bg-white/10" />
					)}
				</>
			))}
		</div>
	);
};

export default UserNav;
