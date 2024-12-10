import { useState } from "react";
import { searchIcon } from "../../assets";

const Search = () => {
    const [search, setSearch] = useState<string>("");

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
        <>
            <div className="w-full flex justify-center items-center mt-[32px] mb-[56px]">
                <div className="w-[60%] flex items-center flex-row-reverse gap-[10px] px-[24px] py-[16px] rounded-[8px] bg-[#F5F5F5] border border-grey-500">
                    <div className="w-[32px]">
                        <img
                            className="w-full object-cover"
                            src={searchIcon}
                            alt="search"
                        />
                    </div>
                    <input
                        className="bg-transparent border-none outline-none placeholder:text-body-14-m text-grey-300 text-right"
                        placeholder="ابحث عن قضية"
                        onChange={handleChangeInput}
                        type="text"
                        value={search}
                        id="search"
                        name="search"
                    />
                </div>
            </div>
        </>
    );
};

export default Search;
