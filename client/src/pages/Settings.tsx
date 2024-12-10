import { GoPlus } from "react-icons/go";
import { iconic, profileAdd } from "../assets";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useUserStore from "../store/useUserStore";

const Settings = () => {
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        console.log(user);
    }, []);

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <main dir="rtl" className="pb-[40px] container mx-auto pt-[32px]">
            <h1 className="text-h1-32-b text-grey-900 mb-[56px]">الإعدادات</h1>
            <div className="flex flex-col">
                <div className="relative w-[192px] h-[192px] select-none mb-[48px]">
                    <div className="w-[192px] h-[192px] rounded-full bg-neutral-1-500 overflow-hidden">
                        <img
                            className="max-w-full object-cover z-10"
                            src={iconic}
                            alt="iconic"
                        />
                    </div>
                    <span className="bg-blue-500 flex justify-center items-center absolute bottom-0 right-[15%] cursor-pointer w-[32px] h-[32px] rounded-full z-50">
                        <GoPlus color="white" size={25} />
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-h2-28-m text-blue-900 mb-[40px]">
                        المعلومات الشخصية
                    </h1>
                    <div className="flex flex-col gap-[32px]">
                        <DataInput
                            key={"name"}
                            label="الإسم"
                            value={user?.username}
                        />
                        <DataInput
                            key={"email"}
                            label="البريد الإلكتروني"
                            value={user?.email}
                        />
                        <DataInput
                            key={"Specialization"}
                            label="التخصص"
                            value="Forensic Science"
                        />
                        <div className="flex justify-end items-center">
                            <button
                                type="submit"
                                className={`outline-none p-[16px] rounded-[10px] group border border-blue-500 text-body-16-m text-blue-900 flex items-center justify-center gap-[8px] hover:bg-blue-100 duration-300 active:bg-blue-800 active:text-white`}
                            >
                                <img
                                    className={`group-active:invert group-active:sepia group-active:saturate-[1000%] group-active:hue-rotate-[180deg]`}
                                    src={profileAdd}
                                    alt="add"
                                />
                                حفظ التغييرات
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Settings;

interface InputProps {
    label: string;
    value: string | undefined;
}

const DataInput: React.FC<InputProps> = ({ label, value }) => {
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditStatus = () => {
        setEdit(!edit);
    };

    useEffect(() => {
        if (edit) {
            inputRef.current?.focus();
        } else {
            inputRef.current?.blur();
        }
    }, [edit, inputRef]);
    return (
        <div className="border-b border-neutral-1-500 flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
                <h1 className="text-blue-900 text-h2-24-m capitalize">
                    {label}
                </h1>
                <span
                    onClick={handleEditStatus}
                    className="text-body-18-m text-secondary-3-500 cursor-pointer"
                >
                    {edit ? "حفظ" : "تعديل"}
                </span>
            </div>
            <div className="h-[50px]">
                <motion.input
                    initial={{ height: "26px" }}
                    animate={{
                        height: edit ? "50px" : "26px",
                        color: edit ? "#082f7b" : "#828282",
                        fontSize: edit ? "18px" : "16px",
                        transition: { duration: 0.2 },
                    }}
                    exit={{ height: "26px" }}
                    className="w-full h-[26px] text-neutral-1-500 text-body-16-m outline-none bg-transparent"
                    type="text"
                    name="name"
                    id="name"
                    value={inputValue}
                    disabled={!edit}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
            </div>
        </div>
    );
};
