import React from "react";

interface ErrorPageProps {
	title?: string;
	message?: string;
	onRetry?: () => void;
	actionLabel?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
	title = "Không tải được dữ liệu",
	message = "Đã xảy ra sự cố khi tải danh sách người dùng. Vui lòng thử lại.",
	onRetry,
	actionLabel = "Thử lại",
}) => {
	return (
        <div className="my-10 px-30">
            <div
                role="alert"
                className="w-full rounded-2xl border shadow-sm p-4 sm:p-5 md:p-6
                    bg-[var(--color-cream-bg)]/60 backdrop-blur
                    border-[color:var(--color-card-bg)]/20"
            >
                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                        className="shrink-0 w-11 h-11 rounded-xl
                            bg-[var(--color-card-bg)]/10
                            border border-[color:var(--color-card-bg)]/20
                            flex items-center justify-center"
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-[var(--color-card-bg)]">
                            <path
                                fill="currentColor"
                                d="M11 7h2v6h-2zm0 8h2v2h-2zm1-13C6.48 2 2 6.48 2 12s4.48 10 10 10
                    10-4.48 10-10S17.52 2 12 2Z"
                            />
                        </svg>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-[var(--color-card-bg)]">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm sm:text-[15px] text-[var(--color-card-bg)]/80">
                            {message}
                        </p>

                        {/* Actions */}
                        <div className="mt-3 flex items-center gap-2">
                            {onRetry && (
                                <button
                                    type="button"
                                    onClick={onRetry}
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-2
                            bg-[var(--color-card-bg)] text-white
                            hover:bg-[var(--color-card-light)] transition
                            focus:outline-none focus:ring-2 focus:ring-white/40"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                                        <path
                                            fill="currentColor"
                                            d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 0 1-8.66 3.54l-1.42 1.42A7 7 0 1 0 12 6Z"
                                        />
                                    </svg>
                                    {actionLabel}
                                </button>
                            )}

                            {/* nút phụ: xem log / chi tiết nếu cần */}
                            {/* <button className="text-sm underline text-[var(--color-card-bg)]/70 hover:text-[var(--color-card-bg)]">
                Xem chi tiết lỗi
                </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
};

export default ErrorPage;
