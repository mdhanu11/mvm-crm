import * as yup from 'yup';
import { strictEmailRegex } from '../../constants/validation.constants';


export const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  full_name: yup.string().required('Fullname is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(strictEmailRegex, 'Invalid email format'),
  module_permissions: yup
    .array()
    .of(yup.string().required())
    .required('At least one permission is required')
    .min(1, 'At least one permission is required')
    .typeError('Please select at least one permission.'),
});
