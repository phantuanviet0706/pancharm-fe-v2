import React from "react";

export interface DynamicPageProps {
	name: string;
	content: string;
}

const DynamicPage = ({ name, content }: DynamicPageProps) => {
	return (
		<div className="max-w-3xl mx-auto px-5 py-10">
			<div className="text-4xl font-bold mb-4 text-center">
				<h1>{name}</h1>
			</div>
			<div className="whitespace-pre-line leading-relaxed text-gray-700">{content}</div>
		</div>
	);
};

export default DynamicPage;
