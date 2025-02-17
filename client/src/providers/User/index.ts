import { apiDevTreeEndPoints } from "../endPoints";
import { useQuery } from "react-query";
import { userDataResponseT, ErrorMessageT } from "./user.interface";
import { apiDevTree } from "../apiClient";

export const useUserData = () => {
    return useQuery<userDataResponseT, ErrorMessageT>({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await apiDevTree.get(apiDevTreeEndPoints.user.userData)
            return response.data
        }
    })
}