export const formatVND = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });

export function formatPhoneVN(input: string, type: "dot" | "space" | "international" = "dot") {
	if (!input) return "";

	let digits = input.replace(/\D/g, "");

	if (digits.startsWith("84")) {
		digits = digits.slice(2);
	} else if (digits.startsWith("084")) {
		digits = digits.slice(3);
	}

	if (!digits.startsWith("0")) {
		digits = "0" + digits;
	}

	digits = digits.substring(0, 10);

	const p1 = digits.substring(0, 3);
	const p2 = digits.substring(3, 6);
	const p3 = digits.substring(6, 10);

	switch (type) {
		case "dot":
			return `${p1}.${p2}.${p3}`;

		case "space":
			return `${p1} ${p2} ${p3}`;

		case "international":
			return `+84 ${digits.substring(1, 3)} ${digits.substring(3, 6)} ${digits.substring(6, 10)}`;

		default:
			return digits;
	}
}

const handleKeyDown = (
	e: React.KeyboardEvent<HTMLDivElement>,
	buttonRef: React.RefObject<HTMLButtonElement>,
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

		if (typeof value === "number" && isNaN(value)) {
			return;
		}

		if (typeof value === "object" && !(value instanceof File)) {
			fd.append(key, JSON.stringify(value));
		} else {
			fd.append(key, value);
		}
	});

	return fd;
};
