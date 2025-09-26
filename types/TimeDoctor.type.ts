export interface TimeDoctorItemInterface {
    id: string;
    file: string;
    file_name: string;
    fileUrl?: string; // Optional: direct download URL
    month: string;
    year: string;
    uploaded_at: string;
    uploaded_by: string;
}

export interface TimeDoctorFileContent {
    id:number;
    name: string;
    personalEmail: string;
    hours: number;
    rate: number;
    additionalHours?: number;
    cbHours?: number;
    overpaidHours?: number;
    bonus?: number;
    cbRelease?: number;
    amount: number;
    advances?: number;
    total: number;
    batch?: string;
    wiseStatus?: string;
    salarySlip?: string;
    pdf?: string;
    email?: string;
    remarks?: string;
    is_approved?: "Yes" | "No";
}
  