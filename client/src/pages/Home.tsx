import { Outlet, useLocation, useParams } from "react-router-dom";
import { Navbar, Search } from "../components";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
const Home = () => {
    const [search, setSearch] = useState<boolean>(true);
    const { caseId } = useParams();

    const location = useLocation();

    useEffect(() => {
        if (caseId || location.pathname === "/settings") {
            setSearch(false);
        } else {
            setSearch(true);
        }
    }, [location.pathname]);
    return (
        <>
            <main className="min-h-screen relative">
                <Navbar />

                <div className="container mx-auto">{search && <Search />}</div>
                <Outlet />
                <div className="w-[60px] h-[60px] rounded-full bg-grey-500 hover:bg-grey-800 active:bg-grey-900 duration-300 fixed bottom-[30px] left-[30px] flex justify-center items-center cursor-pointer">
                    <FaPlus className="text-neutral-1-100" size={25} />
                </div>
            </main>
        </>
    );
};

export default Home;
