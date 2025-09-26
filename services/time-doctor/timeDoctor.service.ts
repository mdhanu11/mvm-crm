import { createApi } from "@reduxjs/toolkit/query/react";
import { TIME_DOCTOR_API, UPLOAD_TIME_DOCTOR_SHEET } from "../../constants/apiUrl";
import { axiosBaseQuery } from "../shared/axiosBaseQuery.service";
import client from "../client";
import { TimeDoctorFileContent } from "../../types/TimeDoctor.type";

export const timeDoctorApi = createApi({
    reducerPath: "timeDoctorApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["TimeDoctor"],
    endpoints: (build) => ({
        getTimeDoctorList: build.query<any, any>({
            query: (params) => ({
                url: TIME_DOCTOR_API,
                method: "get",
                params: { queryParams: params },
            }),
            providesTags: ["TimeDoctor"],
        }), 
        uploadTimeDoctorSheet: build.mutation<any, any>({
            query: (data) => ({
                url: UPLOAD_TIME_DOCTOR_SHEET,
                method: "post",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags: ["TimeDoctor"],
        }),
        getTimeDoctorFileContent: build.query<any, string>({
            query: (fileId) => ({
                url: `${TIME_DOCTOR_API}/${fileId}/content`,
                method: "get",
            }),
            providesTags: ["TimeDoctor"],
        }),

        approveTimeDoctorData: build.mutation<any, { id: number; is_approved:  "Yes" | "No" }>({
            query: ({ id, is_approved }) => ({
              url: `api/timedoctor/data/${id}/approve`,
              method: "post",
              data: { is_approved },
            }),
            invalidatesTags: ["TimeDoctor"],
          }),
          
          updateTimeDoctorData: build.mutation<any, Partial<TimeDoctorFileContent> & { id: number }>({
            query: ({ id, ...data }) => ({
              url: `api/timedoctor/data/${id}/row/edit`,
              method: "post",
              data,
            }),
            invalidatesTags: ["TimeDoctor"],
          }),
          
    }),
});

export const { useGetTimeDoctorListQuery, useUploadTimeDoctorSheetMutation, useGetTimeDoctorFileContentQuery, useApproveTimeDoctorDataMutation, useUpdateTimeDoctorDataMutation, } = timeDoctorApi;

/**
 * Downloads a Time Doctor file blob from the given URL or file ID.
 * @param fileUrl - Direct file URL or file identifier
 * @returns Blob object (e.g., CSV, XLSX file)
 */
export const downloadTimeDoctorFile = async (fileUrl: string): Promise<Blob> => {
    const response = await client.get(
        { url: fileUrl },
        {
            useAuth: true,
            responseType: "blob",
            silentOnFail: false,
        }
    );

    return response.data as Blob;
};
