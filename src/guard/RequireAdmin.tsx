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
				className="flex text-center justify-center items-center 
				h-screen text-2xl text-[var(--color-card-bg)] font-semibold"
			>
				Đang kiểm tra phiên đăng nhập...
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
