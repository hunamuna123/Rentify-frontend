<template>
	<NuxtLayout>
		<div class="-mt-4 lg:-mt-8 w-full flex flex-col gap-10">
			<div class="w-full flex flex-col md:flex-row gap-12">
				<template v-if="isLoading">
					<CatalogProductSkeleton />
				</template>
				<template v-else-if="productData">
					<CatalogProductCarousel :product="productData" />
					<CatalogProductValue :product="productData" />
					<div v-if="productData.developer" class="mt-6">
						<NuxtLink
							:to="`/developers/${productData.developer.id}`"
							class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
						>
							<img
								v-if="productData.developer.logo_url"
								:src="getFullImageUrl(productData.developer.logo_url)"
								:alt="productData.developer.company_name"
								class="w-8 h-8 rounded-full object-cover"
							/>
							<span>{{ productData.developer.company_name }}</span>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>
						</NuxtLink>
					</div>
				</template>
				<template v-else>
					<div class="w-full text-center py-8">
						<p class="text-gray-500">Товар не найден</p>
					</div>
				</template>
			</div>
			<div v-if="productData">
				<CatalogProductTabs :product="productData"/>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed, nextTick } from 'vue'
import { useFetch, useRoute } from '#app'
import { api } from '@/store/api.js'

const productData = ref(null)
const route = useRoute()
const apiStore = api()
const url = computed(() => apiStore.url)

const id = route.params.id

const {
	data: product,
	pending: isLoading,
	error,
	refresh,
} = useFetch(() => {
	return `${url.value}api/v1/properties/${id}/` 
}, {
	headers: {
		accept: 'application/json',
	},
	immediate: true,
})

definePageMeta({
	layout: 'catalog',
})

onMounted(async () => {
	if (!product.value) {
		refresh()
	}
	// Инициализируем Preline после загрузки компонента
	await nextTick()
	if (typeof window !== 'undefined' && window.HSStaticMethods) {
		window.HSStaticMethods.autoInit()
	}
})

watchEffect(async () => {
	if (product.value) {
		productData.value = product.value
		// Переинициализируем Preline после обновления данных
		await nextTick()
		if (typeof window !== 'undefined' && window.HSStaticMethods) {
			setTimeout(() => {
				window.HSStaticMethods.autoInit()
			}, 100)
		}
	}
})

const getFullImageUrl = (url) => {
	if (!url) return ''
	if (url.startsWith('http://') || url.startsWith('https://')) return url
	if (url.startsWith('/')) return `${apiStore.url}${url.substring(1)}`
	return `${apiStore.url}${url}`
}
</script>
