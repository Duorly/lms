<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const router = useRouter()

const profileItems = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: () => {
        router.push('/login')
      }
    }
  ]
])
</script>

<template>
  <header class="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end px-6 gap-6 bg-white/80 dark:bg-[#050C16]/80 backdrop-blur top-0 sticky z-10 transition-colors duration-300">
    <UButton
      :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      color="neutral"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
    />

    <!-- Notifications -->
    <UButton color="neutral" variant="ghost" icon="i-lucide-bell" class="relative">
      <UBadge color="primary" class="absolute -top-1 -right-1 leading-none p-1 w-4 h-4 flex items-center justify-center rounded-full text-[10px]" size="sm">4</UBadge>
    </UButton>

    <!-- Profile -->
    <UDropdownMenu :items="profileItems" :ui="{ content: 'w-48' }">
      <div class="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors">
        <div class="flex flex-col items-end">
          <span class="text-xs text-slate-500 dark:text-slate-400">User</span>
          <span class="text-sm font-semibold text-slate-900 dark:text-white">Alex R.</span>
        </div>
        <UAvatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="Alex R." />
        <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-slate-400" />
      </div>
    </UDropdownMenu>
  </header>
</template>
