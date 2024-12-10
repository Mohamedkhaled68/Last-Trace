import { AnimatePresence, motion } from "framer-motion";
import { logoutIcon, settingIcon } from "../../../assets";
import { Link } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import useTokenStore from "../../../store/useTokenStore";

const UserModal = ({ modal }: { modal: boolean }) => {
    const removeUser = useUserStore((state) => state.removeUser);
    const signOut = useTokenStore((state) => state.signOut);

    const handleLogout = () => {
        removeUser();
        signOut();
    };

    return (
        <>
            <AnimatePresence>
                {modal && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="container mx-auto flex justify-start px-[32px] absolute top-[115px] left-[2.5%] "
                    >
                        <div className="w-[250px] flex flex-col gap-[16px] p-[16px] rounded-[10px] bg-white relative shadow-custom">
                            <div className="border-t-[10px] rounded-md border-l-[10px] rotate-45 w-[20px] h-[20px] border-white absolute top-[-8px] left-[10%]" />
                            <Link
                                to={"/settings"}
                                className="rounded-[8px] border border-grey-500 px-[16px] py-[12px] flex items-center flex-row-reverse gap-[10px]"
                            >
                                <img src={settingIcon} alt="settings" />
                                <p className="text-body-18-m text-grey-900 text-right">
                                    الإعدادات
                                </p>
                            </Link>
                            <div onClick={handleLogout} className="rounded-[8px] border border-secondary-1-500 px-[16px] py-[12px] flex items-center flex-row-reverse gap-[10px] group duration-300 cursor-pointer hover:bg-secondary-1-500">
                                <img className="group-hover:invert group-hover:sepia group-hover:saturate-[1000%]" src={logoutIcon} alt="logout" />
                                <p className="text-body-18-m text-secondary-1-500 group-hover:text-white text-right">
                                    تسجيل الخروج{" "}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UserModal;
