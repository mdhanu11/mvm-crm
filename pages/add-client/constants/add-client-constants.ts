import * as yup from 'yup';

export type ClientFormValues = {
    employeeName: string;
    email: string;
    phone: string;
    linkedin: string;
    address: string;
    clientName: string;
    position: string;
    location: string;
    employeeType: string;
    mode: string;
    manager: string;
    startDate: string;
    contractStart: string;
    contractEnd: string;
    incrementDate: string;
    salary: number;
    paymentDate: string;
    invoiceCycle: string;
    incrementDate2: string;
};

export const schema = yup.object().shape({
    employeeName: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    phone: yup.string().required('Required'),
    linkedin: yup.string().url('Invalid URL').required('Required'),
    address: yup.string().required('Required'),
    clientName: yup.string().required('Required'),
    position: yup.string().required('Required'),
    location: yup.string().required('Required'),
    employeeType: yup.string().required('Required'),
    mode: yup.string().required('Required'),
    manager: yup.string().required('Required'),
    startDate: yup.string().required('Required'),
    contractStart: yup.string().required('Required'),
    contractEnd: yup.string().required('Required'),
    incrementDate: yup.string().required('Required'),
    salary: yup.number().typeError('Must be a number').required('Required'),
    paymentDate: yup.string().required('Required'),
    invoiceCycle: yup.string().required('Required'),
    incrementDate2: yup.string().required('Required'),
});

export const currencies=["USD", "AUD", "GBP", "PHP", "INR", "EUR", "SGD", "AED"]
