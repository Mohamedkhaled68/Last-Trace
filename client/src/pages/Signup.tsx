import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { darkLogo, formLogo } from "../assets";
import { signupFormGroupData } from "../utils/constants";
import FormGroup from "../components/form/FormGroup";
import { useEffect, useState } from "react";
import { UserSignupData } from "../types/auth";
import FormButton from "../components/form/FormButton";
import useSignup from "../hooks/auth/useSignup";

const initialFormValues = {
    username: "",
    email: "",
    password: "",
};

const Signup = () => {
    const [formValues, setFormValues] =
        useState<UserSignupData>(initialFormValues);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
    }>({});

    const { mutateAsync: signup } = useSignup();

    const validateForm = () => {
        const newErrors: typeof errors = {};

        // Username validation: at least 3 characters and must contain a number
        const usernameRegex = /^(?=.*\d)[A-Za-z\d]{3,}$/;
        if (!usernameRegex.test(formValues.username)) {
            newErrors.username =
                " يجب أن يكون 3 أحرف ورقم واحد على الأقل";
        }

        // Email validation: must be in mans.edu.eg domain
        const emailRegex = /^[a-zA-Z0-9._%+-]+@mans\.edu\.eg$/;
        if (!emailRegex.test(formValues.email)) {
            newErrors.email = "البريد يجب أن يكون تابعاً لنطاق mans.edu.eg";
        }

        // Password validation: at least 6 characters
        if (formValues.password.length < 6) {
            newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await signup(formValues);
            console.log("Form submitted:", formValues);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setFormValues(initialFormValues);
        }
    };

    useEffect(() => {
        const isFilled = Object.values(formValues).every(
            (value) => value.trim() !== ""
        );

        setDisabled(!isFilled);
    }, [formValues]);

    return (
        <main className="w-full flex justify-end h-screen relative bg-[#F5F5F5]">
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "50%" }}
                exit={{
                    width: "100%",
                    transition: {
                        duration: 1,
                        delay: 0.5,
                        type: "spring",
                    },
                }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-grey-900"
            >
                <motion.div
                    initial={{ width: "40%" }}
                    animate={{ width: "60%" }}
                    transition={{
                        delay: 1,
                        duration: 0.5,
                        type: "spring",
                    }}
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
                exit={{ opacity: 0 }} // Ensures the exit fade-out
                transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                className="w-1/2 px-[32px] py-[16px]"
            >
                <div className="flex justify-end">
                    <img className="w-[50px]" src={darkLogo} alt="logo" />
                </div>
                <div className="w-[70%] mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <h1 className="text-h1-32-b mb-[30px] text-grey-900 text-center">
                            سجل الآن{" "}
                        </h1>
                        <div className="flex flex-col">
                            {signupFormGroupData.map(
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
                                        containerStyle="mb-[18px]"
                                        error={
                                            errors[id as keyof typeof errors]
                                        }
                                    />
                                )
                            )}
                        </div>
                        <div className="flex justify-end items-center -mt-[11px]">
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
                    <div className="flex justify-center items-center mt-[30px]">
                        <p className="text-body-14-m text-grey-500">
                            هل لديك حساب؟{" "}
                            <Link
                                className="text-body-14-b text-secondary-3-500"
                                to={"/login"}
                            >
                                سجل الدخول الآن
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
};

export default Signup;
