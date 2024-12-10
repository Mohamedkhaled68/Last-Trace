import { useNavigate } from "react-router-dom";

interface CaseCardProps {
    image: string;
    title: string;
    articleDate: string;
    publisher: string;
    id: number;
    max?: boolean;
    type?: string;
}

const CaseCard: React.FC<CaseCardProps> = ({
    image,
    title,
    articleDate,
    publisher,
    id,
    max,
}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`${id}`, { state: { title } });
    };
    return (
        <>
            <div
                onClick={handleNavigate}
                className={`flex flex-col rounded-[8px] overflow-hidden ${
                    max ? "max-w-[370px]" : "w-[370px]"
                } shadow-custom cursor-pointer hover:translate-y-2 duration-300`}
            >
                <div className="w-full h-[170px]">
                    <img
                        className="w-full h-full object-cover"
                        src={image}
                        alt={title}
                    />
                </div>
                <div className="px-[8px] py-[16px] flex flex-col gap-[32px] text-right">
                    <h1 className="text-body-18-b text-black">{title}</h1>
                    <div className="flex justify-between items-center">
                        <p className="text-body-14-r text-black">{publisher}</p>
                        <p className="text-body-14-r text-black">
                            تاريخ النشر : {articleDate}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaseCard;
