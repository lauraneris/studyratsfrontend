'use client';
import axios from 'axios';

// A sua variável de ambiente continua a ser a fonte da verdade
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Criamos a instância do axios com a baseURL correta, incluindo /api/
export const api = axios.create({
    baseURL: `${API_URL}/api/`,
    headers: {
        'Content-Type': 'application/json',
    },
});