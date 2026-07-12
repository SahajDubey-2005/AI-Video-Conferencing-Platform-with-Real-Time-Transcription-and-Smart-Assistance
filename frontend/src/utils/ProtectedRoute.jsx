import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = () => {
    const { userData, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return <Outlet />;
};

export default ProtectedRoute;
