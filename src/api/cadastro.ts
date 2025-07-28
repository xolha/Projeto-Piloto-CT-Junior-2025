"use server";
import { AxiosError } from "axios";
import { api } from '@/lib/api';
import { RegisterFormData } from '@/types/cadastro';

export async function registrar(data: RegisterFormData) {
    try{
        const response = await api.post("/registrar", data);
        return response.data.token;
    } catch (error) {
        if (error instanceof AxiosError) {
            return { error: error.response?.data.message };
        }
        return { error: "Erro inesperado" };
    }
  
}