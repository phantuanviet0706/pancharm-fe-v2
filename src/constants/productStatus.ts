export enum ProductStatus {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	OUT_OF_STOCK = "OUT_OF_STOCK",
	COMING_SOON = "COMING_SOON",
}

export const ProductStatusVariable = function () {
	return [
		{ id: "active", name: "Đang hoạt động", value: "ACTIVE" },
		{ id: "inactive", name: "Ngưng hoạt động", value: "INACTIVE" },
		{ id: "out_of_stock", name: "Hết hàng", value: "OUT_OF_STOCK" },
		{ id: "coming_soon", name: "Sắp ra mắt", value: "COMING_SOON" },
	];
};
