import { GET_USER_DETAIL_URL } from "../../constants/apiUrl";
import client from "../client";


export const GetUserDetailService = async () => {
    try {
        // Send login request using the axiosInstance (configured Axios)
        const response = await client.get(
            {
                url: GET_USER_DETAIL_URL,
            },
            { useAuth: true, silentOnFail: true }
        );

        if (response.status === 200) {
            const data = response.data

            return {
                code: response?.status,
                message: "Successfully ! User details fetched.",
                data: data,
            }
        } else {
            return {
                code: response?.status,
                message: 'Something went wrong. Please try again later.'
            }
        }
    } catch (error: any) {
        console.error(error);
        return {
            code: error.response?.status,
            message: 'Something went wrong. Please try again after sometime.'
        }
    }
};
