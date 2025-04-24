import apiClient from '../client';
import { RegisterFormData } from './types';

export const registerUser = (registerForm: RegisterFormData) =>
    apiClient.post('/auth/register', registerForm);
