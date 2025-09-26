import * as yup from "yup";
import { PRIORITY_TYPES, PriorityInterface } from "../../constants/ticketing.constants";

export interface TicketFormValues {
    title: string;
    description: string | undefined;
    priority: PriorityInterface;
    screenshot: any;
    department: string;
}

export const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required").max(500, "Description cannot exceed 500 characters"),
    priority: yup.string().oneOf(PRIORITY_TYPES),
    department: yup.string().required("Department is required"),
    screenshot: yup
        .mixed()
        .test("fileSize", "File must be under 1000kb", (value:any) =>
            value?.[0] ? value[0].size <= 1000*1024 : true // 1000kb limit
        )
        .optional(),
});
