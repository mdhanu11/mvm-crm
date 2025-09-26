export const baseURL=import.meta.env.VITE_BACKEND_API_URL;

export const POST_LOGIN_URL="/api/login";
export const POST_RESET_PASSWORD_URL="/api/forgot-password";
export const POST_PASSWORD_UPDATE_URL="/api/reset-password";

export const GET_PRODUCT_DATA_URL="/api/getscrapeddata"; // ?source=tradezone
export const GET_PRODUCT_CSV_EXPORT_URL="/api/scrapeddata/exportcsv"; // ?source=tradezone

export const GET_INVOICE_DATA_URL="/api/getinvoicedata"; // ?source=tradezone
export const GET_INVOICE_CSV_EXPORT_URL="/api/invoicedata/exportcsv"; // ?source=tradezone

export const GET_USER_PROFILE_URL="/api/user-details"; 
export const GET_DASHBOARD_DATA_URL="/api/dashboard"; 


export const GET_MEMBER_DATA_LIST_URL="/api/memberdata"; 
export const DELETE_MEMBER_URL="/api/memberdata/:memberId"; 
export const EDIT_MEMBER_URL="/api/memberdata/:memberId"; 
export const POST_MEMBER_URL="/api/memberdata";

export const GET_SUPPLIER_SEARCH_TERM_LIST_URL="/api/supplier_invoices"


export const GET_ALL_SALES_LIST_URL="/api/sales";
export const GET_ALL_XERO_INVOICE_LIST_URL="/api/xero/invoice";


export const GET_USER_DETAIL_URL="/api/user-details"

export const TICKET_API="/api/tickets";
export const TICKET_PUT_API="/api/tickets/:ticketId";

export const UPLOAD_TIME_DOCTOR_SHEET="/api/timedoctor/data"
export const TIME_DOCTOR_API=UPLOAD_TIME_DOCTOR_SHEET