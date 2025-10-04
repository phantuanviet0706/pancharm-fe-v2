import React from "react";

const registry = {
	star: (props) => (
		<svg
			viewBox="0 0 24 24"
			width={props.size || 24}
			height={props.size || 24}
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M12 2l3.09 6.26L22 9.27l-5 4.88L18.18 22 12 18.9 5.82 22 7 14.15l-5-4.88 6.91-1.01L12 2z" />
		</svg>
	),

	heart: (props) => (
		<svg
			viewBox="0 0 24 24"
			width={props.size || 24}
			height={props.size || 24}
			fill="currentColor"
			aria-hidden="true"
			{...props}
		>
			<path d="M12 21s-7.5-4.69-9.33-9.16C1.43 9.1 3.1 6 6.39 6c2.02 0 3.37 1.06 3.99 2.17C10.63 7.06 11.98 6 14 6c3.29 0 4.96 3.1 3.72 5.84C19.5 16.31 12 21 12 21z" />
		</svg>
	),
};

export const registerSvg = (name, component) => {
	registry[name] = component;
};

export const getSvg = (name, props = {}) => {
	const Comp = registry[name];
	if (!Comp) return null;
	return <Comp {...props} />;
};

export const Icon = ({ name, ...props }) => {
	const Comp = registry[name];
	if (!Comp) {
		return null;
	}
	return <Comp {...props} />;
};
