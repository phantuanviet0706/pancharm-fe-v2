// src/routes/RequireAdmin.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { RoleTypes } from "../constants/roleTypes";

export default function RequireAdmin() {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading)
		return (
			<div
				className="
					flex flex-col justify-center items-center h-screen text-center
					bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200
				"
			>
				<div className="animate-spin-slow mb-4">
					<div
						className="
							h-16 w-16 rounded-full border-4 border-white/40 border-t-[var(--color-card-bg)]
							shadow-lg shadow-[var(--color-card-bg)]/30
						"
					></div>
				</div>

				<div
					className="
						text-3xl font-bold text-[var(--color-card-bg)] drop-shadow-md
						bg-white/30 px-6 py-3 rounded-2xl backdrop-blur-md
						animate-fade-in
					"
				>
					Đang kiểm tra phiên đăng nhập...
				</div>

				<p className="mt-3 text-[var(--color-card-bg)]/80 text-sm animate-pulse">
					Vui lòng đợi trong giây lát ✨
				</p>
			</div>
		);

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	var userRole = user?.roles || [];

	if (userRole && !userRole[0]?.name.includes(RoleTypes.SUPER_ADMIN)) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
