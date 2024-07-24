import { object, string, mixed } from 'yup';

export const userSchema = object().shape({
  name: string().required('Name is required'),
  userName: string().min(6, 'Username must be at least 6 characters').matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, 'Username must contain both letters and numbers').required('Username is required'),
  email: string().email('Invalid email format').required('Email is required'),
  phone: string().min(10, 'Phone number must be at least 10 digits').matches(/^[0-9]+$/, 'Phone number must contain only digits').required('Phone number is required'),
  status: mixed().oneOf(['active', 'not_active', 'null'], 'Invalid status'),
});
