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
			fill="currentColor"
			{...p}
		>
			<g transform="translate(0.000000,445.000000) scale(0.100000,-0.100000)" stroke="none">
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

	// Social Icons
	facebook: (p: any) => (
		<svg
			viewBox="0 0 24 24"
			width="26"
			height="26"
			aria-hidden="true"
			{...p}
			fill={p.color ?? "currentColor"}
		>
			<path d="M13.5 21v-7.3h2.45l.37-2.86H13.5V8.38c0-.83.23-1.39 1.42-1.39h1.52V4.43C16.12 4.3 15.23 4 14.14 4 11.9 4 10.37 5.35 10.37 7.99v2.85H8v2.86h2.37V21h3.13z" />
		</svg>
	),

	whatsapp: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={p.color ?? "currentColor"}
			width="24px"
			height="24px"
			viewBox="0 0 256 256"
			id="Flat"
			{...p}
		>
			<path d="M128.00049,28A100.02594,100.02594,0,0,0,41.11475,177.53908l-9.0044,31.51661a11.99971,11.99971,0,0,0,14.835,14.834l31.5166-9.00391A100.00677,100.00677,0,1,0,128.00049,28Zm0,192a91.87082,91.87082,0,0,1-46.95264-12.86719,3.99494,3.99494,0,0,0-3.14355-.4082l-33.15723,9.47363a3.99979,3.99979,0,0,1-4.94434-4.94531l9.47266-33.15625a4.00111,4.00111,0,0,0-.4082-3.14355A92.01077,92.01077,0,1,1,128.00049,220Zm50.51123-73.457-20.45947-11.69141a12.01054,12.01054,0,0,0-12.12745.12891l-13.80664,8.28418a44.04183,44.04183,0,0,1-19.38232-19.38281l8.28369-13.80664a12.0108,12.0108,0,0,0,.12891-12.127l-11.69092-20.46A10.91584,10.91584,0,0,0,100,72a32.00811,32.00811,0,0,0-32,31.88086A84.001,84.001,0,0,0,151.999,188h.12012A32.00842,32.00842,0,0,0,184,156,10.913,10.913,0,0,0,178.51172,146.543ZM152.10791,180h-.1084A75.99972,75.99972,0,0,1,76,103.8926,23.997,23.997,0,0,1,100,80a2.89975,2.89975,0,0,1,2.51172,1.457L114.20264,101.918a4.00418,4.00418,0,0,1-.043,4.042l-9.38916,15.64844a3.9987,3.9987,0,0,0-.21826,3.69824,52.04112,52.04112,0,0,0,26.1416,26.1416,3.99707,3.99707,0,0,0,3.69873-.21875L150.04,141.84084a4.006,4.006,0,0,1,4.043-.04394l20.46045,11.69238A2.89712,2.89712,0,0,1,176,156,23.99725,23.99725,0,0,1,152.10791,180Z" />
		</svg>
	),

	youtube: (p: any) => (
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="currentColor"
			aria-hidden="true"
			{...p}
		>
			<path d="M22.54 6.42a2.8 2.8 0 0 0-1.97-1.98C18.9 4 12 4 12 4s-6.9 0-8.57.44A2.8 2.8 0 0 0 1.46 6.4 29.6 29.6 0 0 0 1 12a29.6 29.6 0 0 0 .46 5.58 2.8 2.8 0 0 0 1.97 1.98C5.1 20 12 20 12 20s6.9 0 8.57-.44a2.8 2.8 0 0 0 1.97-1.98A29.6 29.6 0 0 0 23 12a29.6 29.6 0 0 0-.46-5.58zM10 15.46V8.54L15.5 12 10 15.46z" />
		</svg>
	),

	instagram: (p: any) => (
		<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...p}>
			<rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="4.5"
				stroke="currentColor"
				fill="none"
				strokeWidth="1.6"
			/>
			<circle cx="12" cy="12" r="4.2" stroke="currentColor" fill="none" strokeWidth="1.6" />
			<circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
		</svg>
	),

	pinterest: (p: any) => (
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="currentColor"
			aria-hidden="true"
			{...p}
		>
			<path d="M12.2 3C7.9 3 5 6 5 9.7c0 2 1.1 3.9 3 4.6.3.1.5 0 .6-.3l.4-1.6c.1-.3 0-.4-.2-.6-.7-.5-1.1-1.3-1.1-2.4 0-2.9 2.2-5 5.2-5 2.8 0 4.4 1.7 4.4 4.1 0 3-1.3 5.6-3.2 5.6-.9 0-1.6-.8-1.4-1.7.3-1 .8-2.1.8-2.9 0-.7-.4-1.3-1.2-1.3-1 0-1.8 1.1-1.8 2.6 0 1 .3 1.6.3 1.6l-1.3 5.6c-.4 1.8-.1 4 .1 5.3h1.1l.8-2.9c.3 0 .6.1.9.1 3.9 0 6.7-3.6 6.7-8.4C20.9 6.4 17.5 3 12.2 3z" />
		</svg>
	),

	tiktok: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-tiktok"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
		</svg>
	),

	thread: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-threads"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
		</svg>
	),

	// Admin Setting Company
	location: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-geo-alt"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
			<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
		</svg>
	),

	taxCode: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-card-text"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
			<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
		</svg>
	),

	bank: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-bank2"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916zM12.375 6v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zm-2.5 0v7h-1.25V6zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2M.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1z" />
		</svg>
	),

	phone: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-telephone"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
		</svg>
	),

	email: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-envelope"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
		</svg>
	),

	add: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			className="bi bi-plus"
			viewBox="0 0 16 16"
			{...p}
		>
			<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
		</svg>
	),

	noImage: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-12 w-12 text-gray-400 mb-2"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			{...p}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M3 5h18M3 10h18M3 15h18M3 20h18"
			/>
		</svg>
	),

	// Category Detail Icons
	catName: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82z" />
			<circle cx="7.5" cy="7.5" r="1.5" />
		</svg>
	),
	catSlug: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M3 3v18" />
			<path d="M7 3v18" />
			<path d="M10 3v18" />
			<path d="M14 3v18" />
			<path d="M17 3v18" />
			<path d="M21 3v18" />
		</svg>
	),
	catParent: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M3 7v10c0 1.1.9 2 2 2h9l7-7-7-7H5c-1.1 0-2 .9-2 2z" />
		</svg>
	),

	// ==== Product Detail Icons ==== //
	prodName: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M3 7l7 4 7-4" />
			<path d="M3 7v6l7 4 7-4V7" />
			<path d="M10 3l7 4" />
			<path d="M3 7l7-4" />
		</svg>
	),
	prodSlug: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M20 12l-8 8L0 8V0h8l12 12z" />
			<circle cx="6" cy="6" r="1.5" />
		</svg>
	),
	prodCategory: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M3 3h4l2 2h8v12H3V3z" />
			<path d="M8 10h8M8 14h5" />
		</svg>
	),
	prodPrice: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M12 1v18" />
			<path d="M17 5a5 4 0 1 0-5 4h-2a5 4 0 1 0 5 4" />
		</svg>
	),
	prodDesc: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M4 2h8l4 4v12H4z" />
			<path d="M8 2v4h4" />
			<path d="M7 10h6M7 14h6" />
		</svg>
	),
	prodStatus: (p: any) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			stroke="#5a4a42"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<rect x="1" y="6" width="18" height="8" rx="4" />
			<circle cx="13" cy="10" r="3" />
		</svg>
	),
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
