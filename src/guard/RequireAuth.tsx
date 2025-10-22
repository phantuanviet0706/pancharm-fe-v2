import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ isAuthed }: { isAuthed: Boolean }) {
	const loc = useLocation();
	if (!isAuthed) return <Navigate to={"/auth"} replace state={{ from: loc }} />;

	return <Outlet />;
}

export function RequireRole({ role, need }: { role?: string; need: string }) {
	if (role !== need) return <Navigate to={"/"} replace />;

	return <Outlet />;
}
