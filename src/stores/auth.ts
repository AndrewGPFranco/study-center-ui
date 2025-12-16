import {defineStore} from "pinia";
import {AxiosError} from "axios";
import type {IUserLogin} from "@/types/utils.ts";
import ResponseAPI from "@/utils/ResponseAPI.ts";
import {createAxiosInstance} from "@/network/axios-instance.ts";

export const useAuthStore = defineStore("auth-store", {
    state: () => ({
        apiInstance: createAxiosInstance()
    }),
    actions: {
        async login(input: IUserLogin): Promise<ResponseAPI<string>> {
            try {
                const result = await this.apiInstance.post("/auth/login", input);
                localStorage.setItem("token", result.data.token);
                return new ResponseAPI(false, "Login realizado com sucesso!");
            } catch (error: unknown) {
                return this.handleError(error);
            }
        },
        logout(): void {
            localStorage.removeItem("token");
        },
        handleError(error: unknown) {
            if (error instanceof AxiosError) {
                if (error.code === 'ERR_NETWORK')
                    return new ResponseAPI(true,
                        "O serviço está fora do ar, por favor entrar em contato com o suporte!");

                return new ResponseAPI(true, error.response?.data?.response);
            }

            return new ResponseAPI(true, "Erro inesperado");
        },
        getToken(): string | null {
            return localStorage.getItem("token");
        }
    },
});