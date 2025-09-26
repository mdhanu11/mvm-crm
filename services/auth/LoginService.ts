
import { POST_LOGIN_URL } from "../../constants/apiUrl";
import axiosInstance from "../axiosInstance";
import { GetUserDetailService } from "../user-details/userService";


// Login service function
export const LoginService = async (
    formData: { username: string; password: string },

) => {
    try {

        // Send login request using the axiosInstance (configured Axios)
        const response = await axiosInstance.post(POST_LOGIN_URL, formData,);

        if (response.status === 200) {
            const data = response.data;

            // Store access_token and username in localStorage
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('username', formData.username);
            let profileResponse = await GetUserDetailService();

            if (profileResponse.code == 200) {
                localStorage.setItem('full_name', profileResponse?.data?.full_name || "User");
                localStorage.setItem('role', profileResponse?.data?.role || "");
                localStorage.setItem('permissions', profileResponse?.data?.permissions || []);
            }

            return {
                code: response?.status,
                message: "Successfully ! Login completed.",
                userDetails: {
                    ...profileResponse?.data,
                    permissions: JSON.parse(profileResponse?.data?.permissions)
                }
            }
        } else {
            return {
                code: response?.status,
                message: 'Login failed. Please check your credentials.'
            }
        }
    } catch (error: any) {
        console.error(error);
        if (error?.response?.status == 401) {
            return {
                code: error?.response?.status,
                message: 'Login failed. Please check your credentials.'
            }
        }

        if (error?.response?.status == 500 && error?.response?.data?.msg == "An error occurred: Invalid salt") {
            return {
                code: error?.response?.status,
                message: 'Activate your account first. Click on Forgot Password option above.'
            }
        }
        return {
            code: error?.response?.status,
            message: 'Something went wrong. Please try again after sometime.'
        }
    }
};
