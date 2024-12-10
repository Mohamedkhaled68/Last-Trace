import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Case } from "../types/case";
import { CaseCard, Comments } from "../components";
import useGetAllCases from "../hooks/cases/useGetAllCases";

const CasePage = () => {
    const [article, setArticle] = useState<Case>();

    const [articles, setArticles] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { caseId } = useParams();
    const location = useLocation();

    const { mutateAsync } = useGetAllCases();

    useEffect(() => {
        const fetchCase = async () => {
            try {
                setLoading(true);
                const data: Case[] = await mutateAsync();
                setArticles(data.filter((i) => i.id !== Number(caseId)));
                const currentCase = data.find((item) => {
                    if (
                        item.id === Number(caseId) &&
                        item.title === location.state.title
                    ) {
                        return item;
                    }
                });
                setArticle(currentCase);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching case data:", error);
                setError("An error occurred while fetching the case.");
                setLoading(false);
            }
        };

        fetchCase();
        console.log(location.state);
    }, [caseId, mutateAsync]);

    if (loading || !article) return <>Loading...</>;
    if (error) return <>{error}</>;
    return (
        <>
            <main
                dir="rtl"
                className="min-h-screen bg-[#EBEBEB] w-full grid grid-cols-12 text-black text-right"
            >
                <div className="px-[32px] h-full col-span-9 pt-[40px] pb-[40px]">
                    <div className="mb-[56px] w-[85%] mx-auto max-h-[450px]  rounded-[10px] bg-grey-200 overflow-hidden">
                        <img
                            className="w-full object-cover"
                            src={article.image}
                            alt="case Image"
                        />
                    </div>
                    <div className="flex items-center justify-between flex-row-reverse mb-[64px]">
                        <div className="flex flex-col items-center gap-[8px]">
                            <p className="text-body-18-r">
                                كاتب المقال : {article.publisher}
                            </p>
                            <p className="text-body-18-r">
                                تاريخ المقال : {article.articleDate}
                            </p>
                        </div>{" "}
                        <h1 className="text-h1-32-b">{article.title}</h1>
                    </div>

                    <div className="flex flex-col gap-[56px] mb-[88px]">
                        {/* {Case Details} */}
                        <div className="flex flex-col">
                            <h1 className="text-h2-28-b mb-[16px]">
                                بيانات القضية:
                            </h1>
                            <div className="flex flex-col gap-[8px]">
                                <p className="text-[20px] font-medium">
                                    <span className="text-[20px] font-bold">
                                        نوع الجريمة:{" "}
                                    </span>
                                    {article.caseDetails.type}
                                </p>
                                <p className="text-[20px] font-medium">
                                    <span className="text-[20px] font-bold">
                                        مكان الجريمة:{" "}
                                    </span>
                                    {article.caseDetails.place}
                                </p>
                                <p className="text-[20px] font-medium">
                                    <span className="text-[20px] font-bold">
                                        التاريخ والوقت:{" "}
                                    </span>
                                    {article.caseDetails.date}
                                </p>
                                <p className="text-[20px] font-medium">
                                    <span className="text-[20px] font-bold">
                                        وصف مختصر للجريمة:{" "}
                                    </span>
                                    {article.caseDetails.description}
                                </p>
                            </div>
                        </div>

                        {/* {Case Members} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b mb-[16px]">
                                الأطراف المعنية:
                            </h1>
                            {/* {SUS} */}
                            <div className="flex flex-col gap-[16px]">
                                <h1 className="text-h2-24-r">المشتبه بهم:</h1>
                                <div className="flex flex-col gap-[10px]">
                                    {article.interestedParties.suspects.map(
                                        (i) => (
                                            <div
                                                key={i.name}
                                                className="flex flex-col gap-[8px]"
                                            >
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الإسم:
                                                    </span>
                                                    {i.name}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الأوصاف الشخصية:{" "}
                                                    </span>
                                                    {i.personalDescriptions}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        دوره في القضية:{" "}
                                                    </span>
                                                    {i.role}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        وصف مختصر للجريمة:{" "}
                                                    </span>
                                                    {i.description}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* {Witnesses} */}
                            <div className="flex flex-col gap-[16px]">
                                <h1 className="text-h2-24-r">الشهود:</h1>
                                <div className="flex flex-col gap-[10px]">
                                    {article.interestedParties.Witnesses.map(
                                        (i) => (
                                            <div
                                                key={i.name}
                                                className="flex flex-col gap-[8px]"
                                            >
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الإسم:
                                                    </span>
                                                    {i.name}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الأدوار:{" "}
                                                    </span>
                                                    {i.role}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        أقوالهم:{" "}
                                                    </span>
                                                    {i.testimonies}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            {/* {Victims} */}
                            <div className="flex flex-col gap-[16px]">
                                <h1 className="text-h2-24-r">الضحايا:</h1>
                                <div className="flex flex-col gap-[10px]">
                                    {article.interestedParties.victims.map(
                                        (i) => (
                                            <div
                                                key={i.name}
                                                className="flex flex-col gap-[8px]"
                                            >
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الإسم:
                                                    </span>
                                                    {i.name}
                                                </p>
                                                <p className="text-[20px] font-medium">
                                                    <span className="text-[20px] font-bold">
                                                        الوصف:{" "}
                                                    </span>
                                                    {i.description}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* {Case Evidence} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b mb-[16px]">
                                الأدلة المادية:
                            </h1>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    الأدلة المرفقة:
                                </h1>
                                <ul className="flex flex-wrap gap-x-[50px] gap-y-[4px] list-disc w-[85%]">
                                    {article.physicalEvidence.attachedGuides.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">وصف الأدلة: </h1>
                                <div className="flex flex-col gap-[8px]">
                                    {article.physicalEvidence.evidenceDescription.map(
                                        (i) => (
                                            <p
                                                key={i.evidence}
                                                className="text-[20px] font-medium"
                                            >
                                                <span className="text-[20px] font-bold">
                                                    {i.evidence}:{" "}
                                                </span>
                                                {i.description}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    كيفية جمع الأدلة:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc ">
                                    {article.physicalEvidence.collectionMethods.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    الأماكن التي عُثر فيها على الأدلة:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.physicalEvidence.evidencePlace.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* {Case Actions} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b mb-[16px]">
                                الإجراءات المتخذة:
                            </h1>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    خطوات التحقيق:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.actions.investigationSteps.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    القرارات الأولية:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.actions.decisions.map((i) => (
                                        <li
                                            className="text-[20px] font-medium"
                                            key={i}
                                        >
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* {Case results} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b mb-[16px]">
                                النتائج:{" "}
                            </h1>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">تحليل الأدلة: </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.results.evidenceAnalysis.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    ربط الأدلة بالوقائع والأطراف:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.results.evidencePrediction.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    الاستنتاجات المبدئية:{" "}
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.results.preliminaryConclusions.map(
                                        (i) => (
                                            <li
                                                className="text-[20px] font-medium"
                                                key={i}
                                            >
                                                {i}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* {Case Recommendations} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b mb-[16px]">
                                التوصيات:{" "}
                            </h1>
                            <div className="flex flex-col gap-[8px]">
                                <h1 className="text-h2-24-m">
                                    الإجراء المطلوب:
                                </h1>
                                <ul className="flex flex-col gap-[8px] list-disc">
                                    {article.recommendations.map((i) => (
                                        <li
                                            className="text-[20px] font-medium"
                                            key={i}
                                        >
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* {Conclusion} */}
                        <div className="flex flex-col gap-[24px]">
                            <h1 className="text-h2-28-b">لنغلق القضية:</h1>
                            <p className="text-h2-24-m">
                                إذا كنت في مكان المحقق، ما هي الأدلة التي كنت
                                ستبحث عنها أولاً في مسرح الجريمة لكي تربط الجاني
                                بالضحية؟ وهل تعتقد أن هناك أدلة قد تكون غفلت
                                عنها التحقيقات الأولية؟
                            </p>
                        </div>
                    </div>
                    <Comments />
                </div>
                {/* <div className="bg-white h-full py-[40px] px-[15px] col-span-3">
                    <h1 className="text-h2-24-m mb-[16px]">
                        القضايا ذات الصلة
                    </h1>
                    <div className="flex flex-col gap-[32px]">
                        {articles.length === 0 && (
                            <h1 className="text-center text-body-16-r">
                                لا توجد القضايا ذات صلة
                            </h1>
                        )}
                        {articles.map((i, idx) => (
                            <CaseCard
                                key={idx}
                                image={i.image}
                                title={i.title}
                                articleDate={i.articleDate}
                                publisher={i.publisher}
                                id={i.id}
                                max={true}
                            />
                        ))}
                    </div>
                </div> */}
            </main>
        </>
    );
};

export default CasePage;
