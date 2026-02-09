import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
}