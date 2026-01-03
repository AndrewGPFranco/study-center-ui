import {AxiosError} from "axios";
import {defineStore} from "pinia";
import {useAuthStore} from "@/stores/auth.ts";
import ResponseAPI from "@/utils/ResponseAPI.ts";
import type {IRegisterStudy} from "@/types/utils.ts";
import {createAxiosInstance} from "@/network/axios-instance.ts";

export const useCalendarStore = defineStore("calendar-store", {
    state: () => ({
        apiInstance: createAxiosInstance(),
        token: useAuthStore().getToken(),
    }),
    actions: {
        async handleDateInThePast(input: { dayNumber: number, month: string, year: number }): Promise<boolean> {
            const response = await this.apiInstance.post("/calendar/is-date-in-the-past", input, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            return response.data;
        },
        async registerNewStudy(input: IRegisterStudy): Promise<ResponseAPI<string>> {
            try {
                const response = await this.apiInstance.post("/calendar/register-study", input, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                return new ResponseAPI(false, response.data);
            } catch (error: unknown) {
                return this.handleError(error);
            }
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
        async getStudiesByDate(date: Date): Promise<ResponseAPI<IRegisterStudy[]>> {
            try {
                const dateFormatted = date.toISOString().split("T")[0];
                const response = await this.apiInstance.get(`/calendar/get-all-by-date?date=${dateFormatted}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                return new ResponseAPI(false, response.data);
            } catch (error: unknown) {
                return this.handleError(error);
            }
        },
        async deleteTask(idTask: string): Promise<ResponseAPI<string>> {
            try {
                const response = await this.apiInstance.delete(`/calendar?idStudyTask=${idTask}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });

                return new ResponseAPI(false, response.data);
            } catch (error: unknown) {
                return this.handleError(error);
            }
        }
    },
});