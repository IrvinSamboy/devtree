import { apiDevTreeEndPoints } from "../endPoints";
import { useQuery } from "react-query";
import { userDataResponseT, MessageT } from "./user.interface";
import { apiDevTree } from "../apiClient";
import { AxiosError } from "axios";

export const useUserData = () => {
    return useQuery<userDataResponseT, AxiosError<MessageT>>({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await apiDevTree.get(apiDevTreeEndPoints.user.userData, {withCredentials: true})
            return response.data
        }
    })
}