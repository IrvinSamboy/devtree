import { apiDevTreeEndPoints } from "../endPoints";
import { apiDevTree } from "../apliClient";
import { useMutation } from 'react-query'
import { signInRequestT, signInResponseI, ErrorMessage, signUpRequestT, signUpResponseT } from "./auth.interfaces";

export const useSignin = () => {
    return useMutation<signInResponseI, ErrorMessage, signInRequestT>({
        mutationKey: ['signin'],
        mutationFn: async (data) => {
            const response = await apiDevTree.post(apiDevTreeEndPoints.auth.signin, {
                email: data.email,
                password: data.password
            })

            return response.data
        }
    })
}

export const useSignUp = () => {
    return useMutation<signUpResponseT, ErrorMessage, signUpRequestT>({
        mutationKey: ['signup'],
        mutationFn: async (data) => {
            const response = await apiDevTree.post(apiDevTreeEndPoints.auth.signup, {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password
            })

            return response.data
        }
    })
}
