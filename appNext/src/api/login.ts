"use server";
import { AxiosError } from "axios";
import { api } from '@/lib/api';
import { LoginFormData } from '@/types/login';

export async function login(data: LoginFormData) {
    try{
        const response = await api.post("/login", data);
        return response.data.token;
    } catch (error) {
        if (error instanceof AxiosError) {
            return { error: error.response?.data.message };
        }
        return { error: "Erro inesperado" };
    }
  
}