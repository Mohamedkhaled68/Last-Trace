import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { UserLoginData } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/useTokenStore";
import useUserStore from "../../store/useUserStore";

const useLogin = () => {
    const signIn = useTokenStore((state) => state.signIn);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["user", "login"],

        mutationFn: async (data: UserLoginData) => {
            const response = await axios.post(
                `${baseUrl}/api/auth/login`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            signIn(response.data.token);
            setUser(response.data.user);
            return response;
        },

        onSuccess: () => {
            navigate("/", { replace: true });
        },
        onError: (error: any) => {
            console.log(error.response.data.message);
        },
    });
};

export default useLogin;
