<template>
    <HeaderNavbar />
    <div class="min-h-screen flex items-center justify-center">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">

            <div class="flex flex-col items-center gap-2">

                <h2 class="text-lg font-semibold text-gray-700 mt-2">Вход в систему</h2>
                <p class="text-gray-500 text-sm">Войдите в свой аккаунт для продолжения</p>
            </div>
            <form @submit.prevent="sendData" class="flex flex-col gap-4">
                <div>
                    <label for="phone-input" class="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
                    <input id="phone-input" v-model="phone" type="tel" placeholder="+7 (___) ___-__-__"
                        class="w-full px-4 py-2  border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500 focus:outline-none transition-colors"
                        required />
                </div>
                <div v-if="showPin" class="flex justify-between mt-4">
                    <input v-for="(digit, index) in pinDigits" :key="index" :ref="(el) => setPinRef(el, index)" type="text"
                        inputmode="numeric" maxlength="1"
                        class="block w-14 h-14 text-center border border-gray-300 rounded-md sm:text-sm focus:ring-1 focus:ring-gray-500 focus:border-gray-500 focus:outline-none transition-colors"
                        placeholder="⚬" :value="digit" @input="onPinInput($event, index)"
                        @keydown.backspace="onPinBackspace($event, index)" />
                </div>
                <p v-if="errorBoolen" class="text-gray-600 text-sm">{{ error }}</p>
                <button type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                    {{ showPin ? 'Подтвердить код' : 'Войти' }}
                </button>

                <p class="text-center text-sm text-gray-600 mt-2">
                    Нет аккаунта?
                    <NuxtLink to="/auth/register" class="text-gray-600 hover:underline font-medium">Зарегистрироваться
                    </NuxtLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import IMask from "imask";
import { useCookie } from "#app";
import { api as useApiStore } from "@/store/api";

export default {
    middleware: 'auth',
    data() {
        return {
            phone: "",
            error: "",
            errorBoolen: false,
            showPin: false,
            pinDigits: ["", "", "", ""],
            pinRefs: {},
            session_id: "",
        };
    },
    mounted() {
        this.initPhoneMask();
    },
    setup() {
        let api = useApiStore();
        return { api };
    },
    methods: {
        initPhoneMask() {
            const phoneInput = document.getElementById("phone-input");
            if (phoneInput) {
                const mask = IMask(phoneInput, {
                    mask: "+{7} (000) 000-00-00",
                    lazy: false,
                    prepare: (str) => str.replace(/\D/g, ''),
                });

                mask.on('accept', () => {
                    this.phone = mask.value;
                });
            }
        },
        setPinRef(el, index) {
            if (el) this.pinRefs[`pin${index}`] = el;
        },
        onPinInput(event, index) {
            let val = event.target.value.replace(/\D/g, "");
            if (!val) return;
            this.pinDigits[index] = val[0];
            let next = index + 1;
            if (next < 4) this.pinRefs[`pin${next}`]?.focus();
            if (this.pinDigits.every((d) => d.length === 1)) this.submitPinCode();
        },
        onPinBackspace(event, index) {
            if (!event.target.value && index > 0) {
                this.pinDigits[index - 1] = "";
                this.pinRefs[`pin${index - 1}`]?.focus();
            }
        },
        async submitPinCode() {
            let code = this.pinDigits.join("");
            try {
                let res = await axios.post(`${this.api.url}api/v1/auth/verify/`, {
                    session_id: this.session_id,
                    verification_code: code,
                });

                let accessToken = useCookie("access_token", {
                    maxAge: 60 * 60 * 24 * 7,
                });
                let refreshToken = useCookie("refresh_token", {
                    maxAge: 60 * 60 * 24 * 7,
                });

                accessToken.value = res.data.access_token;
                refreshToken.value = res.data.refresh_token;

                this.$router.push("/");
            } catch (error) {
                this.errorBoolen = true;
                this.error = error.response?.data?.detail || error.response?.data?.message || "Неверный код или ошибка авторизации";
            }
        },
        async sendData() {
            if (this.showPin) {
                this.submitPinCode();
                return;
            }

            let cleaned = this.phone.replace(/\D/g, "");
            if (cleaned.length !== 11) {
                this.error = "Введите корректный номер телефона";
                this.errorBoolen = true;
                return;
            }

            try {
                let response = await axios.post(`${this.api.url}api/v1/auth/login/`, {
                    phone: `+` + cleaned,
                });

                this.session_id = response.data.session_id;
                this.showPin = true;
                this.errorBoolen = false;
                console.log("Код отправлен:", response.data);
            } catch (error) {
                this.errorBoolen = true;
                this.error = error.response?.data?.detail || error.response?.data?.message || "Ошибка авторизации";
            }
        },
    },
};
</script>