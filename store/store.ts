import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "../services/client/client.service";
import { employeeApi } from "../services/employee/employee.service";
import { userDetailsApi } from "../services/user-details/user.service";
import authReducer from './slices/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { staffApi } from "../services/staff/staff.service";
import { ticketApi } from "../services/ticketing/ticketing.service";
import { timeDoctorApi } from "../services/time-doctor/timeDoctor.service";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userDetailsApi.reducerPath]: userDetailsApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [employeeApi.reducerPath]: employeeApi.reducer,
        [staffApi.reducerPath]: staffApi.reducer,
        [ticketApi.reducerPath]: ticketApi.reducer,
        [timeDoctorApi.reducerPath]:timeDoctorApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            clientApi.middleware,
            employeeApi.middleware,
            userDetailsApi.middleware,
            staffApi.middleware,
            ticketApi.middleware,
            timeDoctorApi.middleware
        ])
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
    RootState
> = useSelector;