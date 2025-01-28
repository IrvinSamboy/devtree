import { apiDevTreeEndPoints } from "../endPoints";
import { apiDevTree } from "../apliClient";
import { useMutation } from 'react-query'
import { signInRequestI, signInResponseI, signInResponseErrI } from "./auth.interfaces";

export const useSignin = () => {
    return useMutation<signInResponseI, signInResponseErrI, signInRequestI>({
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