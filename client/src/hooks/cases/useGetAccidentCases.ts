import { useMutation } from "@tanstack/react-query";

const useGetAccidentCases = () => {
    return useMutation({
        mutationKey: ["cases", "accident"],
        mutationFn: async () => {
            const response = await fetch("/data/accidentCases.json");
            if (!response.ok) {
                throw new Error("Failed to fetch cases");
            }
            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            console.log("Fetched data:", data);
        },
        onError: (error: any) => {
            console.error("Error fetching cases:", error);
        },
    });
};

export default useGetAccidentCases;
