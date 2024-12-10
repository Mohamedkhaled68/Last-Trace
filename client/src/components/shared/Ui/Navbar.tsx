import { NavLink, useLocation } from "react-router-dom";
import { iconic, logo } from "../../../assets";
import UserModal from "./UserModal";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
    {
        id: 1,
        label: "قضايا القتل",
        path: "/murder-cases",
    },
    {
        id: 2,
        label: "قضايا السرقة",
        path: "/theft-cases",
    },
    {
        id: 3,
        label: "قضايا الاغتصاب",
        path: "/assault-cases",
    },
    {
        id: 4,
        label: "الجرائم الإلكترونية",
        path: "/cyber-crimes",
    },
    {
        id: 5,
        label: "الإهمال الطبي",
        path: "/medical-negligence",
    },
    {
        id: 6,
        label: "الحوادث المرورية",
        path: "/accident-cases",
    },
];

const Navbar = () => {
    const [modal, setModal] = useState<boolean>(false);
    const location = useLocation();

    const modalToggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (modal) setModal(false);
    }, [location.pathname]);

    return (
        <>
            <nav className="w-full h-[128px] flex justify-center items-center bg-grey-900 relative select-none">
                <div className="container mx-auto w-full px-[32px] py-[16px]">
                    <div className="flex justify-between items-center flex-row-reverse">
                        <div className="flex items-center flex-row-reverse">
                            <div className="flex justify-center items-center ml-[80px]">
                                <img
                                    className="max-w-full object-cover"
                                    src={logo}
                                    alt="logo"
                                />
                            </div>
                            <div className="flex items-center flex-row-reverse gap-[40px]">
                                {links.map((link) => (
                                    <NavLink
                                        key={link.id}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-body-18-b text-white relative transition duration-300"
                                                : "text-body-18-m text-white relative transition duration-300"
                                        }
                                    >
                                        {link.label}
                                        <AnimatePresence>
                                            {link.path ===
                                                location.pathname && (
                                                <motion.span
                                                    initial={{
                                                        x: "100%",
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        x: "-50%",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        x: "-100%",
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="block w-[70%]  h-[2px] bg-white absolute bottom-[-12px] left-[50%] translate-x-[-50%] "
                                                />
                                            )}
                                        </AnimatePresence>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                        <div
                            onClick={modalToggle}
                            className="w-[55px] h-[55px] flex justify-center items-center hover:bg-grey-50 duration-300 cursor-pointer rounded-full overflow-hidden"
                        >
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                <img
                                    className="max-w-full object-cover"
                                    src={iconic}
                                    alt="iconic"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <UserModal modal={modal} />
            </nav>
        </>
    );
};

export default Navbar;
