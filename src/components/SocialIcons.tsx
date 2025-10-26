// SocialIcons.tsx
import React from "react";
import Icon from "./Icon";

const Tile: React.FC<React.ComponentProps<"a">> = ({ className = "", ...props }) => (
	<a
		{...props}
		className={`grid h-12 w-12 place-items-center rounded-2xl bg-[var(--color-cream-bg)] text-[var(--color-card-bg)] 
                shadow-[0_1px_0_rgba(0,0,0,0.04)] transition
                hover:scale-105 hover:shadow-md active:scale-95 ${className}`}
	/>
);

export default function SocialIcons() {
	return (
		<div className="w-full py-3">
			<div className="flex max-w-5xl gap-3">
				{/* Facebook */}
				<Tile
					href="https://facebook.com"
					aria-label="Facebook"
					target="_blank"
					rel="noreferrer"
				>
					<Icon name="facebook" color="var(--color-card-bg)"></Icon>
				</Tile>

				{/* WhatsApp */}
				<Tile href="https://wa.me/" aria-label="WhatsApp" target="_blank" rel="noreferrer">
					<Icon name="whatsapp" color="var(--color-card-bg)"></Icon>
				</Tile>

				{/* YouTube */}
				<Tile
					href="https://youtube.com"
					aria-label="YouTube"
					target="_blank"
					rel="noreferrer"
				>
					<Icon name="youtube" color="var(--color-card-bg)"></Icon>
				</Tile>

				{/* Instagram */}
				<Tile
					href="https://instagram.com"
					aria-label="Instagram"
					target="_blank"
					rel="noreferrer"
				>
					<Icon name="instagram" color="var(--color-card-bg)"></Icon>
				</Tile>

				{/* Pinterest */}
				<Tile
					href="https://pinterest.com"
					aria-label="Pinterest"
					target="_blank"
					rel="noreferrer"
				>
					<Icon name="pinterest" color="var(--color-card-bg)"></Icon>
				</Tile>
			</div>
		</div>
	);
}
