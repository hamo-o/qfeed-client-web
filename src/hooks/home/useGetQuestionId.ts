import { useQuery } from "@tanstack/react-query";
import { getQuestionsId, getQuestionsIdChoices } from "src/apis/questions";

export const useGetQuestionsId = ({ id }: any) => {
    const { data, isLoading, error, refetch } = useQuery(
        [],
        async () => {
            const params: any = {};
            const result = await getQuestionsId(id);
            return result;
        },
        {
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 30
        }
    );

    return { data, isLoading, error, refetch };
};