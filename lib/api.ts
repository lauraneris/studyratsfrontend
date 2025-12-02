// lib/api.ts

'use client';
import axios from 'axios';

// A sua variável de ambiente continua a ser a fonte da verdade
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Criamos a instância do axios com a baseURL correta
export const api = axios.create({
    baseURL: `${API_URL}/api/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- LÓGICA DE INTERCEPTAÇÃO PARA RENOVAÇÃO DE TOKEN ---

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    // Se a resposta for bem-sucedida (status 2xx), apenas a retorne
    (response) => {
        return response;
    },
    // Se a resposta falhar...
    async (error) => {
        const originalRequest = error.config;

        // Verificamos se o erro é 401 e se ainda não tentamos renovar o token para este pedido
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Marcamos para evitar um loop infinito de retentativas

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    // Se não houver refresh token, desista e redirecione para o login
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Pedimos um novo access token usando o refresh token
                const response = await axios.post(`${API_URL}/api/token/refresh/`, {
                    refresh: refreshToken,
                });
                
                const { access } = response.data;

                // Atualizamos o localStorage e o cabeçalho padrão do axios
                localStorage.setItem('accessToken', access);
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;

                // Reenviamos o pedido original que falhou, agora com o novo token
                return api(originalRequest);

            } catch (refreshError) {
                // Se a renovação falhar (ex: refresh token também expirou),
                // limpamos tudo e redirecionamos para o login.
                console.error("Refresh token inválido. A redirecionar para o login.");
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                delete api.defaults.headers.common['Authorization'];
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Para qualquer outro erro, apenas o rejeite
        return Promise.reject(error);
    }
);