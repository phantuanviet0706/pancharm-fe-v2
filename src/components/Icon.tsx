import React from "react";

const icons = {
	star: (p: any) => (
		<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...p}>
			<path
				d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 
               12 18.9 5.82 22 7 14.15l-5-4.88 
               6.91-1.01L12 2z"
			/>
		</svg>
	),

	heart: (p: any) => (
		<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...p}>
			<path
				d="M12 21s-7.5-4.69-9.33-9.16C1.43 9.1 3.1 6 6.39 6c2.02 0 
               3.37 1.06 3.99 2.17C10.63 7.06 11.98 6 14 6c3.29 0 
               4.96 3.1 3.72 5.84C19.5 16.31 12 21 12 21z"
			/>
		</svg>
	),

	check: (p: any) => (
		<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" {...p}>
			<path
				d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 
               20.3 7.7l-1.4-1.4z"
			/>
		</svg>
	),

	pancharm: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.0"
			width="24px"
			height="24px"
			viewBox="0 0 445.000000 445.000000"
			preserveAspectRatio="xMidYMid meet"
			{...p}
		>
			<g
				transform="translate(0.000000,445.000000) scale(0.100000,-0.100000)"
				fill="#B35340"
				stroke="none"
			>
				<path d="M1945 4416 c-128 -26 -131 -27 -250 -71 -101 -37 -225 -104 -331 -177 -79 -54 -232 -192 -224 -201 3 -4 44 1 90 9 102 19 318 21 415 5 441 -75 762 -340 899 -741 36 -108 46 -176 46 -326 0 -132 -13 -225 -44 -313 -9 -24 -16 -50 -16 -58 0 -18 22 -16 160 18 193 47 439 27 634 -51 298 -119 459 -314 508 -615 42 -265 -137 -540 -412 -631 -72 -24 -205 -24 -285 0 -167 49 -291 174 -324 325 -17 78 -4 188 31 256 85 167 241 244 374 185 100 -44 133 -109 80 -160 -31 -28 -69 -29 -106 -1 -45 32 -101 28 -145 -11 -82 -72 -109 -193 -63 -286 64 -127 233 -198 381 -159 134 35 255 148 293 273 18 62 18 215 -1 289 -17 65 -71 159 -124 218 -71 78 -243 174 -386 214 -63 17 -277 25 -372 12 -84 -11 -223 -61 -308 -112 -173 -103 -303 -257 -376 -446 -83 -212 -87 -413 -14 -625 105 -305 334 -510 670 -601 92 -25 348 -31 461 -11 146 25 322 101 443 191 63 46 427 416 482 490 153 203 231 373 290 630 26 115 19 583 -10 619 -5 6 -12 27 -16 46 -29 152 -143 389 -254 531 -49 62 -835 855 -944 952 -133 119 -281 206 -467 274 -155 57 -267 75 -485 79 -165 2 -204 -1 -300 -20z" />
				<path d="M1299 3825 c-48 -7 -115 -21 -150 -30 -91 -23 -253 -105 -345 -174 -107 -80 -435 -415 -512 -523 -205 -285 -303 -635 -277 -982 15 -188 56 -349 132 -519 95 -213 166 -297 680 -808 246 -245 477 -467 512 -493 184 -135 411 -233 626 -270 122 -21 414 -21 526 0 261 48 496 160 699 329 133 112 140 139 30 111 -34 -9 -80 -16 -103 -17 -23 0 -50 -4 -60 -7 -20 -8 -169 8 -300 32 -462 87 -819 452 -880 901 -1 11 -5 25 -7 30 -7 14 -4 180 4 245 9 76 31 168 55 229 17 46 18 51 3 51 -10 0 -29 -6 -44 -14 -41 -22 -194 -54 -288 -62 -140 -11 -312 18 -460 77 -308 123 -476 331 -510 629 -12 109 -2 191 36 276 93 211 282 350 492 361 83 5 102 2 175 -22 145 -49 233 -123 289 -243 71 -155 39 -320 -87 -449 -48 -49 -71 -64 -114 -77 -68 -20 -94 -20 -159 -1 -114 34 -156 114 -90 170 34 29 63 28 105 -4 13 -11 40 -19 64 -19 83 -1 160 111 154 225 -5 80 -21 117 -78 170 -70 66 -129 88 -237 88 -74 0 -93 -4 -150 -31 -64 -31 -152 -109 -190 -170 -102 -163 -60 -427 92 -587 92 -96 232 -170 408 -217 57 -15 268 -20 340 -8 288 49 516 214 653 473 85 161 125 381 98 540 -68 399 -350 694 -741 774 -138 28 -282 34 -391 16z" />
			</g>
		</svg>
	),

	leaf: (p: any) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			aria-hidden="true"
			width="24px"
			height="24px"
			{...p}
		>
			<path
				d="M20.5 3.5C13 3 6 6.5 4.2 12.7c-1.6 5.5 2.6 7.8 6.5 7.8 6.8 0 9.8-6.6 9.8-17z"
				strokeWidth="1.6"
				fill="currentColor"
				fillOpacity="0.08"
			/>
			<path d="M6 14c3.2-.4 6.3 1.1 8 4" strokeWidth="1.6" strokeLinecap="round" />
			<path d="M12 8c.2 1.7-.3 3.8-2 6" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	),

	inlineSparkle: (p: any) => (
		<svg
			className="text-amber-500 animate-pulse"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			aria-hidden="true"
			width="24px"
			height="24px"
			{...p}
		>
			<path
				d="M8 2l1 2.4L12 6l-3 1.6L8 10 7 7.6 4 6l3-1.6L8 2z"
				strokeWidth="1.2"
				fill="currentColor"
			/>
		</svg>
	),

	sparkles: (p: any) => (
		<svg
			className="text-amber-500 animate-pulse"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			aria-hidden="true"
			width="24px"
			height="24px"
			{...p}
		>
			<path
				d="M12 3l1.6 3.8L17.5 9l-3.9 2.2L12 15l-1.6-3.8L6.5 9l3.9-2.2L12 3z"
				strokeWidth="1.5"
				fill="currentColor"
				fillOpacity="0.15"
			/>
			<path
				d="M19.5 4.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6z"
				strokeWidth="1.2"
			/>
			<path d="M5 14l.6 1.4 1.4.6-1.4.6L5 18 4.4 16.6 3 16l1.4-.6L5 14z" strokeWidth="1.2" />
			<path d="M3 21c4.5-3.2 8.8-3.2 13.3 0" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	),

	// Admin SVG
	// user: (p:any) => (

	// )
};

export type IconProps = {
	name: string;
	sx?: React.CSSProperties;
	className?: string;
	size?: number | string;
	color?: string;
	strokeWidth?: number;
	[key: string]: any;
};

function useSvgCommonProps({
	sx,
	className,
	size,
	color,
	strokeWidth,
	...rest
}: Omit<IconProps, "name">) {
	const wh =
		size == null
			? {}
			: typeof size === "number"
				? { width: size, height: size }
				: { width: size, height: size };
	const style: React.CSSProperties = { color, ...(sx || {}) };
	const common = { className, style, strokeWidth, ...wh, ...rest };
	return common;
}

const Icon: React.FC<IconProps> = ({ name, sx, className, size, color, strokeWidth, ...rest }) => {
	const Comp = icons[name];
	if (!Comp) return null;
	const svgProps = useSvgCommonProps({ sx, className, size, color, strokeWidth, ...rest });
	return <Comp {...svgProps} />;
};

export default Icon;
