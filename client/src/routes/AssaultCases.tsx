import { useEffect, useState } from "react";
import { CaseCard } from "../components";
import { Case } from "../types/case";
import useGetAssaultCases from "../hooks/cases/useGetAssaultCases";

const AssaultCases = () => {
    const [cases, setCases] = useState<Case[]>([]);
    const { mutateAsync } = useGetAssaultCases();

    useEffect(() => {
        const fetchCases = async () => {
            const data = await mutateAsync();
            setCases(data);
        };

        return () => {
            fetchCases();
        };
    }, []);
    return (
        <>
            <div className="flex flex-col justify-end text-right container mx-auto pb-[40px]">
                <h1 className="text-h1-32-b text-black mb-[40px]">
                    قضايا الإغتصاب
                </h1>

                <div
                    className="w-full grid grid-cols-3 justify-items-start gap-y-[20px] "
                    dir="rtl"
                >
                    {cases.map((card, index) => (
                        <CaseCard
                            key={index}
                            image={card.image}
                            title={card.title}
                            articleDate={card.articleDate}
                            publisher={card.publisher}
                            id={card.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AssaultCases;
