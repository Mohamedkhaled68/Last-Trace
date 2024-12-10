import { useMutation } from "@tanstack/react-query";

const useGetCybercrimeCases = () => {
    return useMutation({
        mutationKey: ["cases", "cypercrime"],
        mutationFn: async () => {
            const response = await fetch("/data/cybercrimeCases.json");
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

export default useGetCybercrimeCases;
