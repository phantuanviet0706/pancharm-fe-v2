import "./context";

export const formatVND = (n: number) => n.toLocaleString("vi-VN", { maximumFractionDigits: 0 });
