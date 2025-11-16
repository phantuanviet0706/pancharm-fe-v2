export enum OrderStatus {
	DRAFTING = "DRAFTING",
	CREATED = "CREATED",
	CONFIRMED = "CONFIRMED",
	PROCESSING = "PROCESSING",
	COMPLETED = "COMPLETED",
	CANCELLED = "CANCELLED",
	RETURNED = "RETURNED",
	FAILED = "FAILED",
}

export const OrderStatusVariable = function () {
	return [
		{ id: "drafting", name: "Nháp", value: "DRAFTING" },
		{ id: "created", name: "Đã tạo", value: "CREATED" },
		{ id: "confirmed", name: "Đã xác nhận", value: "CONFIRMED" },
		{ id: "processing", name: "Đang xử lý", value: "PROCESSING" },
		{ id: "completed", name: "Đã hoàn thành", value: "COMPLETED" },
		{ id: "cancelled", name: "Đang hủy", value: "CANCELLED" },
		{ id: "returned", name: "Đang hoàn trả", value: "RETURNED" },
		{ id: "failed", name: "Thất bại", value: "FAILED" },
	];
};
