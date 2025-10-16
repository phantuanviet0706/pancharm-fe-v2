import React from "react";

export interface FormInputProps {
	label: string;
	type:
		| "text"
		| "int"
		| "float"
		| "date"
		| "datetime"
		| "checkbox"
		| "radio"
		| "color"
		| "file"
		| "hidden";
}

const FormInput = () => {
	return <div></div>;
};

export default FormInput;
