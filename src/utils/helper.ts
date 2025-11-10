export const formatVND = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });

export const handleKeyDown = (
	e: React.KeyboardEvent<HTMLDivElement>,
	buttonRef: HTMLButtonElement,
) => {
	if (e.key === "Enter") {
		e.preventDefault();
		buttonRef.current?.click();
	}
};

export const handleFormData = (data: Object) => {
	const fd = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value === undefined || value == null) {
			return;
		}

		if (typeof value === "object" && !(value instanceof File)) {
			fd.append(key, JSON.stringify(value));
		} else {
			fd.append(key, value);
		}
	});

	return fd
};
