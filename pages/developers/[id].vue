<template>
  <HeaderNavbar/>
  <div class="max-w-[90rem] mt-10 mx-auto px-4 py-8">
    <NuxtLink to="/developers" class="text-blue-600 hover:underline flex items-center mb-6">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      Назад к застройщикам
    </NuxtLink>
    <div v-if="isLoading" class="text-center py-10 text-gray-400">Загрузка...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">Ошибка: {{ error }}</div>
    <div v-else>
      <!-- Шапка -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center mb-8 shadow">
        <img v-if="developer.logo_url" :src="getFullImageUrl(developer.logo_url)" :alt="developer.company_name" class="w-20 h-20 rounded-full object-cover bg-gray-100 border" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-2xl font-bold">{{ developer.company_name }}</h1>
            <span v-if="developer.is_verified" class="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">Верифицирован</span>
          </div>
          <div class="text-gray-500 mt-1">{{ developer.description }}</div>
          <div class="flex items-center gap-6 mt-4 flex-wrap">
            <div class="flex items-center gap-1 text-yellow-500 text-lg font-semibold">
              ★ <span class="ml-1 text-gray-900">{{ developer.rating }}</span>
            </div>
            <div class="text-gray-500 text-sm">{{ developer.reviews_count }} отзывов</div>
            <div class="text-gray-500 text-sm">Проектов: <b class="text-gray-700">{{ developer.properties_count }}</b></div>
            <div class="text-gray-500 text-sm">Активных: <b class="text-gray-700">{{ developer.active_properties_count }}</b></div>
          </div>
          <div class="flex gap-2 mt-4 flex-wrap">
            <a v-if="developer.contact_phone" :href="`tel:${developer.contact_phone}`" class="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm">Позвонить</a>
            <a v-if="developer.contact_email" :href="`mailto:${developer.contact_email}`" class="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm">Написать</a>
            <a v-if="developer.website" :href="developer.website" target="_blank" class="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm">Сайт</a>
          </div>
        </div>
      </div>
      <!-- Tabs -->
      <div class="flex gap-6 border-b mb-8">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="['py-2 px-4 -mb-px border-b-2', activeTab === tab ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500']">
          {{ tabLabels[tab] }}
        </button>
      </div>
      <!-- Tab Content -->
      <div v-if="activeTab === 'projects'">
        <h2 class="text-xl font-semibold mb-4">Активные проекты ({{ projects.length }})</h2>
        <div v-if="isProjectsLoading" class="text-gray-400">Загрузка...</div>
        <div v-else-if="projectsError" class="text-red-500">{{ projectsError }}</div>
        <div v-else-if="projects.length === 0" class="text-gray-400">Нет активных проектов.</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="project in projects" :key="project.id" class="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 shadow hover:shadow-lg transition">
            <div class="flex items-center gap-2 mb-2">
              <span v-if="project.status === 'ACTIVE'" class="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">Активно</span>
              <span v-else class="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700">{{ project.status }}</span>
            </div>
            <div class="text-lg font-bold">{{ project.title || 'Без названия' }}</div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
              <span>Цена: <b class="text-gray-900">{{ formatPrice(project.price) }} ₽</b></span>
              <span>Комнат: <b class="text-gray-900">{{ project.rooms > 0 ? project.rooms : '—' }}</b></span>
              <span>Площадь: <b class="text-gray-900">{{ project.area > 0 ? project.area + ' м²' : '—' }}</b></span>
              <span>Этаж: <b class="text-gray-900">{{ project.floor || '—' }}/{{ project.total_floors || '—' }}</b></span>
            </div>
            <div class="text-xs text-gray-400 mt-2">Создано: {{ formatDate(project.created_at) }}</div>
            <NuxtLink :to="`/catalog/${project.id}`" class="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'complexes'">
        <h2 class="text-xl font-semibold mb-4">ЖК</h2>
        <div v-if="complexes.length === 0" class="text-gray-400">Нет активных ЖК.</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="complex in complexes" :key="complex.id" class="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 shadow hover:shadow-lg transition">
            <div class="text-gray-900 font-medium mt-2">{{ complex.title }}</div>
            <div class="text-gray-500 text-sm">{{ complex.district }}, {{ complex.city }}</div>
            <div class="flex items-center gap-3 text-xs text-gray-500 mt-2">
              <span>🛏 {{ complex.rooms_count }}</span>
              <span>🛁 {{ complex.bathrooms_count }}</span>
              <span>📐 {{ complex.total_area }} м²</span>
            </div>
            <NuxtLink :to="`/catalog/${complex.id}`" class="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
      <div v-else-if="activeTab === 'about'">
        <h2 class="text-xl font-semibold mb-4">О компании</h2>
        <div class="text-gray-700 whitespace-pre-line">{{ developer.legal_name }}
ИНН: {{ developer.inn }}
ОГРН: {{ developer.ogrn }}
Юр. адрес: {{ developer.legal_address }}

{{ developer.description }}</div>
      </div>
      <div v-else-if="activeTab === 'reviews'">
        <h2 class="text-xl font-semibold mb-4">Отзывы</h2>
        <div class="text-gray-400">Отзывы пока не реализованы.</div>
      </div>
      <div v-else-if="activeTab === 'contacts'">
        <h2 class="text-xl font-semibold mb-4">Контакты</h2>
        <div class="text-gray-700">
          <div>Телефон: <a :href="`tel:${developer.contact_phone}`" class="text-blue-600">{{ developer.contact_phone }}</a></div>
          <div>Email: <a :href="`mailto:${developer.contact_email}`" class="text-blue-600">{{ developer.contact_email }}</a></div>
          <div>Сайт: <a :href="developer.website" class="text-blue-600" target="_blank">{{ developer.website }}</a></div>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/store/api.js'

const apiStore = api()
const route = useRoute()
const developer = ref(null)
const isLoading = ref(true)
const error = ref(null)
const projects = ref([])
const complexes = ref([])
const isProjectsLoading = ref(false)
const isComplexesLoading = ref(false)
const projectsError = ref(null)
const complexesError = ref(null)

const getFullImageUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) return `${apiStore.url}${url.substring(1)}`
  return `${apiStore.url}${url}`
}

const tabs = ['projects', 'complexes', 'about', 'reviews', 'contacts']
const tabLabels = {
  projects: 'Проекты',
  complexes: 'ЖК',
  about: 'О компании',
  reviews: 'Отзывы',
  contacts: 'Контакты',
}
const activeTab = ref('projects')

const formatPrice = (price) => {
  if (!price) return '0'
  return new Intl.NumberFormat('ru-RU').format(parseFloat(price))
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetch(`${apiStore.url}api/v1/developers/${route.params.id}`)
    if (!res.ok) throw new Error('Ошибка загрузки застройщика')
    const data = await res.json()
    developer.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
  await fetchProjects()
  await fetchComplexes()
})

const fetchProjects = async () => {
  isProjectsLoading.value = true
  projectsError.value = null
  try {
    const res = await fetch(`${apiStore.url}api/v1/developers/public/${route.params.id}/properties`)
    if (!res.ok) throw new Error('Ошибка загрузки проектов')
    const data = await res.json()
    projects.value = Array.isArray(data.items) ? data.items : []
  } catch (e) {
    projectsError.value = e.message
    projects.value = []
  } finally {
    isProjectsLoading.value = false
  }
}

const fetchComplexes = async () => {
  isComplexesLoading.value = true
  complexesError.value = null
  try {
    const res = await fetch(`${apiStore.url}api/v1/developers/public/${route.params.id}/complexes`)
    if (!res.ok) throw new Error('Ошибка загрузки комплексов')
    complexes.value = await res.json()
  } catch (e) {
    complexesError.value = e.message
    complexes.value = []
  } finally {
    isComplexesLoading.value = false
  }
}
</script> 