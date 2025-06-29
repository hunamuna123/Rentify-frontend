<template>
    <div class="border-b  border-gray-200 mb-6">
        <nav class="flex justify-between gap-x-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
            <div class="flex gap-x-2 justify-end">
                <button type="button"
                    class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b border-gray-300-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none active"
                    id="tabs-with-icons-item-1" aria-selected="true" data-hs-tab="#tabs-with-icons-1"
                    aria-controls="tabs-with-icons-1" role="tab">
                    Характеристики
                </button>
                <button type="button"
                    class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b border-gray-300-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    id="tabs-with-icons-item-2" aria-selected="false" data-hs-tab="#tabs-with-icons-2"
                    aria-controls="tabs-with-icons-2" role="tab">
                    Описание
                </button>
                <button type="button"
                    class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b border-gray-300-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    id="tabs-with-icons-item-3" aria-selected="false" data-hs-tab="#tabs-with-icons-3"
                    aria-controls="tabs-with-icons-3" role="tab">
                    Расположение
                </button>
                <button type="button"
                    class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b border-gray-300-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                    id="tabs-with-icons-item-4" aria-selected="false" data-hs-tab="#tabs-with-icons-4"
                    aria-controls="tabs-with-icons-4" role="tab">
                    Удобства
                </button>
            </div>
        </nav>
    </div>
    <div id="tabs-with-icons-1" role="tabpanel" aria-labelledby="tabs-with-icons-item-1">
        <div class="overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-700">
                <tbody>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium w-1/2">Тип недвижимости</th>
                        <td class="py-4 px-4">{{ getPropertyTypeName(product?.property_type) }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Тип сделки</th>
                        <td class="py-4 px-4">{{ product?.deal_type === 'SALE' ? 'Продажа' : 'Аренда' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Площадь</th>
                        <td class="py-4 px-4">{{ product?.total_area ? `${product.total_area} м²` : 'Не указана' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Жилая площадь</th>
                        <td class="py-4 px-4">{{ product?.living_area ? `${product.living_area} м²` : 'Не указана' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Площадь кухни</th>
                        <td class="py-4 px-4">{{ product?.kitchen_area ? `${product.kitchen_area} м²` : 'Не указана' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Количество комнат</th>
                        <td class="py-4 px-4">{{ product?.rooms_count || '0' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Количество спален</th>
                        <td class="py-4 px-4">{{ product?.bedrooms_count || '0' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Количество ванных</th>
                        <td class="py-4 px-4">{{ product?.bathrooms_count || '0' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Этаж</th>
                        <td class="py-4 px-4">{{ product?.floor || '0' }}/{{ product?.total_floors || '0' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Год постройки</th>
                        <td class="py-4 px-4">{{ product?.building_year || 'Не указан' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Высота потолков</th>
                        <td class="py-4 px-4">{{ product?.ceiling_height ? `${product.ceiling_height} м` : 'Не указана' }}</td>
                    </tr>
                    <tr class="border-b border-gray-300">
                        <th class="py-4 px-4 font-medium">Тип ремонта</th>
                        <td class="py-4 px-4">{{ getRenovationTypeName(product?.renovation_type) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="tabs-with-icons-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-icons-item-2">
        <p class="text-gray-600">
            {{ product?.description || 'Отсутствует' }}
        </p>
    </div>

    <div id="tabs-with-icons-3" class="hidden" role="tabpanel" aria-labelledby="tabs-with-icons-item-3">
        <div class="flex flex-col gap-2 text-md">
            <p><strong>Адрес:</strong> {{ product?.full_address || 'Не указан' }}</p>
            <p><strong>Город:</strong> {{ product?.city || 'Не указан' }}</p>
            <p><strong>Район:</strong> {{ product?.district || 'Не указан' }}</p>
            <p><strong>Улица:</strong> {{ product?.street || 'Не указана' }}</p>
            <p><strong>Дом:</strong> {{ product?.house_number || 'Не указан' }}</p>
            <p><strong>Квартира:</strong> {{ product?.apartment_number || 'Не указана' }}</p>
            <p><strong>Индекс:</strong> {{ product?.postal_code || 'Не указан' }}</p>
            <p v-if="product?.latitude && product?.longitude">
                <strong>Координаты:</strong> {{ product.latitude }}, {{ product.longitude }}
            </p>
        </div>
    </div>

    <div id="tabs-with-icons-4" class="hidden" role="tabpanel" aria-labelledby="tabs-with-icons-item-4">
        <div class="flex flex-col gap-2 text-md">
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" :class="product?.has_balcony ? 'bg-green-500' : 'bg-gray-300'"></span>
                    <span>Балкон/лоджия</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" :class="product?.has_loggia ? 'bg-green-500' : 'bg-gray-300'"></span>
                    <span>Лоджия</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" :class="product?.has_elevator ? 'bg-green-500' : 'bg-gray-300'"></span>
                    <span>Лифт</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" :class="product?.has_parking ? 'bg-green-500' : 'bg-gray-300'"></span>
                    <span>Парковка</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" :class="product?.has_furniture ? 'bg-green-500' : 'bg-gray-300'"></span>
                    <span>Мебель</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        default: () => ({})
    }
})

const getPropertyTypeName = (type) => {
    switch(type) {
        case 'APARTMENT': return 'Квартира'
        case 'HOUSE': return 'Дом'
        case 'COMMERCIAL': return 'Коммерческая'
        default: return 'Недвижимость'
    }
}

const getRenovationTypeName = (type) => {
    switch(type) {
        case 'NONE': return 'Без ремонта'
        case 'COSMETIC': return 'Косметический'
        case 'EURO': return 'Евроремонт'
        case 'DESIGNER': return 'Дизайнерский'
        default: return 'Не указан'
    }
}

const initTabs = () => {
    if (typeof window !== 'undefined' && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit()
    }
}

onMounted(async () => {
    await nextTick()
    initTabs()
})

// Переинициализируем табы при изменении продукта
watch(() => props.product, async () => {
    await nextTick()
    setTimeout(() => {
        initTabs()
    }, 100)
}, { deep: true })
</script>