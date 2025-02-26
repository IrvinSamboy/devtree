import { apiDevTreeEndPoints } from "../endPoints";
import { useMutation, useQuery } from "react-query";
import { userData, MessageT, updateUserDataPayload } from "./user.interface";
import { apiDevTree } from "../apiClient";
import { AxiosError } from "axios";

export const useUserData = () => {
    return useQuery<userData, AxiosError<MessageT>>({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await apiDevTree.get(apiDevTreeEndPoints.user.userData)
            return response.data
        }
    })
}

export const useUpdateUserData = () => {
    return useMutation<updateUserDataPayload, AxiosError<MessageT>, updateUserDataPayload>({
        mutationKey: ["updateUserData"],
        mutationFn: async (data) => {
            const response = await apiDevTree.put(apiDevTreeEndPoints.user.updateUserDAta, {
                userName: data.userName,
                name: data.name,
                description: data.description
            }
        )

            return response.data
        }
    })
}