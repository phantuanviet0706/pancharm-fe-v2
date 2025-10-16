import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const InputNumber = ({
	min = 1,
	max = 99,
	initial = 1,
	onChange,
}: {
	min?: number;
	max?: number;
	initial?: number;
	onChange?: (value: number) => void;
}) => {
	const [value, setValue] = useState(initial);

	const handleChange = (newValue: number) => {
		if (newValue < min || newValue > max) return;
		setValue(newValue);
		onChange?.(newValue);
	};

	return (
		<div className="flex items-center justify-between w-[160px] h-[3.5em] border border-gray-400 rounded-md text-white select-none bg-black">
			<button
				className="flex-1 text-center text-xl hover:bg-gray-800 transition"
				onClick={() => handleChange(value - 1)}
			>
				<RemoveIcon />
			</button>
			<span className="w-8 text-center font-semibold">{value}</span>
			<button
				className="flex-1 text-center text-xl hover:bg-gray-800 transition"
				onClick={() => handleChange(value + 1)}
			>
				<AddIcon />
			</button>
		</div>
	);
};

export default InputNumber;
