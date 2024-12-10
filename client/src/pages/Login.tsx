import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { darkLogo, formLogo } from "../assets";
import { LoginFormGroupData } from "../utils/constants";
import FormGroup from "../components/form/FormGroup";
import { useEffect, useState } from "react";
import { UserLoginData } from "../types/auth";
import FormButton from "../components/form/FormButton";
import useLogin from "../hooks/auth/useLogin";

const initialFormValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [formValues, setFormValues] =
        useState<UserLoginData>(initialFormValues);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const { mutateAsync: login } = useLogin();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formValues);
            console.log(formValues);
        } catch (err) {
            setLoading(false);
            console.log(err);
        } finally {
            setLoading(false);
            setFormValues(initialFormValues);
        }
    };

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value !== ""
        );

        if (isFilled) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues]);
    return (
        <main className="w-full flex justify-end h-screen relative bg-[#F5F5F5]">
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "50%" }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-grey-900"
            >
                <motion.div
                    initial={{ width: "40%" }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                >
                    <img
                        className="w-full object-cover"
                        src={formLogo}
                        alt="formLogo"
                    />
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                className="w-1/2 px-[32px] py-[16px]"
            >
                <div className="flex justify-end">
                    <img className="w-[50px]" src={darkLogo} alt="logo" />
                </div>
                <div className="w-[70%] mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <h1 className="text-h1-32-b mb-[60px] text-grey-900 text-center">
                            تسجيل الدخول
                        </h1>
                        <div className="flex flex-col">
                            {LoginFormGroupData.map(
                                ({ id, label, placeholder, type, value }) => (
                                    <FormGroup
                                        key={id}
                                        onChange={handleInputChange}
                                        value={value(formValues)}
                                        id={id}
                                        type={type}
                                        label={label}
                                        placeholder={placeholder}
                                        inputStyle="bg-transparent placeholder:text-neutral-1-400"
                                    />
                                )
                            )}
                        </div>
                        <div className="flex justify-between items-center -mt-[11px]">
                            <Link
                                className="text-body-14-m text-secondary-3-500"
                                to={"/resrt-password"}
                            >
                                نسيت كلمة المرور
                            </Link>
                            <div className="flex items-center gap-[8px]">
                                <label
                                    htmlFor="remember"
                                    className="text-body-14-m text-grey-500"
                                >
                                    تذكرني
                                </label>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                />
                            </div>
                        </div>
                        <FormButton
                            text="تسجيل الدخول"
                            disabled={disabled}
                            loading={loading}
                        />
                    </form>
                    <div className="flex justify-center items-center mt-[40px]">
                        <p className="text-body-14-m text-grey-500">
                            ليس لديك حساب؟{" "}
                            <Link
                                className="text-body-14-b text-secondary-3-500"
                                to={"/signup"}
                            >
                                سجل الآن
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default Login;
