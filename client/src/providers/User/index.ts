import { apiDevTreeEndPoints } from "../endPoints";
import { useMutation, useQuery } from "react-query";
import { userData, MessageT, updateUserDataPayload, uploadImage } from "./user.interface";
import { apiDevTree } from "../apiClient";
import { AxiosError } from "axios";

export const useUserData = () => {
    return useQuery<userData, AxiosError<MessageT>>({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await apiDevTree.get(apiDevTreeEndPoints.user.userData)
            return response.data
        },
        enabled: false
    })
}

export const useUpdateUserData = () => {
    return useMutation<updateUserDataPayload, AxiosError<MessageT>, updateUserDataPayload>({
        mutationKey: ["updateUserData"],
        mutationFn: async (data) => {
            const response = await apiDevTree.put(apiDevTreeEndPoints.user.updateUserDAta, {
                userName: data.userName,
                name: data.name,
                description: data.description,
                socialMediaUrls: data.socialMediaUrls
            }
        )

            return response.data
        }
    })
}

export const useUploadImage = () => {
    return useMutation<MessageT, AxiosError<MessageT>, uploadImage>({
        mutationKey: ["uploadImage"],
        mutationFn: async (data) => {
            const formData = new FormData()
            formData.append("file", data.file)
            const response = await apiDevTree.post(apiDevTreeEndPoints.user.uploadImage, formData)

            return response.data
        }
    })
}