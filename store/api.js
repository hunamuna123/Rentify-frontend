import { defineStore } from 'pinia'

export const api = defineStore('apiUrl', {
	state: () => ({
		url: 'http://192.168.1.164:8000/',
	}),
})