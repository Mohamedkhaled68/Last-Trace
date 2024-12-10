import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { UserSignupData } from "../../types/auth";
import useTokenStore from "../../store/useTokenStore";
import useUserStore from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    const signIn = useTokenStore((state) => state.signIn);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["user", "signup"],

        mutationFn: async (data: UserSignupData) => {
            const response = await axios.post(
                `${baseUrl}/api/auth/signup`,
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

export default useSignup;
