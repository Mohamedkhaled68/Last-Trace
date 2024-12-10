import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/shared/Ui/Loading";
import useTokenStore from "../store/useTokenStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = useTokenStore((state) => state.token);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            setIsLoading(false);
        } else {
            navigate("/login");
        }
    }, [token]);

    if (isLoading) {
        return (
            <>
                <div className="w-full h-screen flex justify-center items-center">
                    <Loading size="80" />
                </div>
            </>
        );
    }

    if (token) {
        return <>{children}</>;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
