import { POST_PASSWORD_UPDATE_URL, POST_RESET_PASSWORD_URL } from "../../constants/apiUrl";
import axiosInstance from "../axiosInstance";

export const ResetPasswordLinkService = async (
    formData: { username: string;},

) => {
    try {

        const response = await axiosInstance.post(POST_RESET_PASSWORD_URL, formData);

        if (response.status === 200) {
           
            return {
                code: response?.status,
                message: "Success ! Link sent on you registered email id."
            }
        } else {
            return {
                code: response?.status,
                message: 'Failed ! Please try again later.'
            }
        }
    } catch (error: any) {
        console.error(error);
        return {
            code: error.response?.status,
            message: error.response?.status==404?"Username is Invalid.":'Something went wrong. Please try again after sometime.'
        }
    }
};


export const UpdatePasswordService = async (
    formData: any,

) => {
    try {

        const response = await axiosInstance.post(POST_PASSWORD_UPDATE_URL, formData);

        if (response.status === 200) {
           
            return {
                code: response?.status,
                message: "Success ! Password updated for you account."
            }
        } else {
            return {
                code: response?.status,
                message: 'Failed ! Please try again later.'
            }
        }
    } catch (error: any) {
        console.error(error);
        return {
            code: error.response?.status,
            message: error.response?.status==400?'Invalid request or token is expired.':'Something went wrong. Please try again after sometime.'
        }
    }
};