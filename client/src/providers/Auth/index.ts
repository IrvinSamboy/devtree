import { apiDevTreeEndPoints } from "../endPoints";
import { apiDevTree } from "../apiClient";
import { useMutation, useQuery } from 'react-query'
import { signInRequestT, MessageT, signUpRequestT, signUpResponseT } from "./auth.interfaces";
import { AxiosError } from "axios";

export const useSignin = () => {
    return useMutation<MessageT, AxiosError<MessageT>, signInRequestT>({
        mutationKey: ['signin'],
        mutationFn: async (data) => {
            const response = await apiDevTree.post(apiDevTreeEndPoints.auth.signin, {
                email: data.email,
                password: data.password
            }, {withCredentials: true})

            return response.data
        }
    })
}

export const useSignUp = () => {
    return useMutation<signUpResponseT, AxiosError<MessageT>, signUpRequestT>({
        mutationKey: ['signup'],
        mutationFn: async (data) => {
            const response = await apiDevTree.post(apiDevTreeEndPoints.auth.signup, {
                name: data.name,
                userName: data.userName,
                email: data.email,
                password: data.password
            })

            return response.data
        }
    })
}

export const useVerifySessionToken = () => {
    return useQuery<MessageT, AxiosError<MessageT>>({
        queryKey: ['verifySessionToken'],
        queryFn: async () => {
            const response = await apiDevTree.get(apiDevTreeEndPoints.auth.tokenVerify, {withCredentials : true})
            return response.data
        },
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: false
    })
} 