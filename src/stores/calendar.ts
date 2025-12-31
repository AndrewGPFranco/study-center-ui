import {defineStore} from "pinia";
import {useAuthStore} from "@/stores/auth.ts";
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

            return !response.data;
        }
    },
});