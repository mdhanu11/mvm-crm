import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery.service";

export const userDetailsApi = createApi({
    reducerPath: "userDetailsApi",
    tagTypes: ["User"],
    baseQuery: axiosBaseQuery(),
    endpoints: (build) => ({
        getUserData: build.query({
            query: () => ({
                url: "/api/user-details",
                method: "get",
            }),
            providesTags: ["User"]
        })
    }),
})

export const {
    useGetUserDataQuery
} = userDetailsApi;