<script setup lang="ts">
import { ref, computed } from 'vue'

const activeTab = ref('all')

const tabs = [
  { label: 'Toutes', key: 'all' },
  { label: 'Non lues', key: 'unread' },
  { label: 'Mentions', key: 'mentions' }
]

// Mock data for notifications
const notifications = ref([
  {
    id: 1,
    type: 'course', // course, reply, achievement, system
    title: 'Nouveau cours disponible',
    description: 'Le cours "Advanced Vue 3 Patterns" vient d\'être publié par Sarah Drasner.',
    time: 'Il y a 2h',
    read: false,
    icon: 'i-lucide-book-open',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10'
  },
  {
    id: 2,
    type: 'reply',
    title: 'Nouveau commentaire',
    description: 'Alex a répondu à votre question dans "React vs Vue : Lequel choisir en 2024 ?".',
    time: 'Il y a 5h',
    read: false,
    icon: 'i-lucide-message-square',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Nouveau badge débloqué !',
    description: 'Félicitations ! Vous avez obtenu le badge "Bug Hunter Elite".',
    time: 'Hier',
    read: true,
    icon: 'i-lucide-award',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    id: 4,
    type: 'system',
    title: 'Mise à jour de la plateforme',
    description: 'Praetoria sera en maintenance programmée ce dimanche de 02h00 à 04h00 (UTC).',
    time: 'Il y a 2 jours',
    read: true,
    icon: 'i-lucide-settings-2',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10'
  },
  {
    id: 5,
    type: 'mentions',
    title: 'Vous avez été mentionné',
    description: '@marcus_dev a mentionné votre nom dans le canal #architecture.',
    time: 'Il y a 3 jours',
    read: true,
    icon: 'i-lucide-at-sign',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d'
  }
])

const filteredNotifications = computed(() => {
  if (activeTab.value === 'unread') {
    return notifications.value.filter(n => !n.read)
  }
  if (activeTab.value === 'mentions') {
    return notifications.value.filter(n => n.type === 'mentions' || n.type === 'reply')
  }
  return notifications.value
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const toggleReadStatus = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = !notification.read
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800/50 mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          Notifications
          <UBadge v-if="unreadCount > 0" color="primary" variant="solid" class="rounded-full shadow-[0_0_10px_rgba(0,218,255,0.3)]">{{ unreadCount }}</UBadge>
        </h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Restez informé de vos activités et de l'état du système.</p>
      </div>
      
      <UButton 
        v-if="unreadCount > 0"
        color="neutral" 
        variant="ghost" 
        icon="i-lucide-check-check" 
        @click="markAllAsRead"
        class="text-sm font-semibold hover:text-violet-500 self-start sm:self-auto"
      >
        Tout marquer comme lu
      </UButton>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border',
          activeTab === tab.key 
            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md' 
            : 'bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Notifications List -->
    <div class="space-y-4">
      <TransitionGroup name="list">
        <div 
          v-for="notification in filteredNotifications" 
          :key="notification.id"
          :class="[
            'group relative flex gap-4 p-5 rounded-2xl border transition-all duration-300',
            notification.read 
              ? 'bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800/60 shadow-sm opacity-75 hover:opacity-100' 
              : 'bg-violet-50/50 dark:bg-violet-900/10 border-violet-200 dark:border-violet-800/50 shadow-md ring-1 ring-violet-500/20'
          ]"
        >
          <!-- Unread Dot Indicator -->
          <div 
            v-if="!notification.read" 
            class="absolute top-6 left-2 w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(0,218,255,0.6)]"
          ></div>

          <!-- Icon or Avatar -->
          <div class="relative shrink-0 pl-2">
            <UAvatar 
              v-if="notification.avatar" 
              :src="notification.avatar" 
              size="md" 
              class="ring-2 ring-white dark:ring-[#0A1220]"
            />
            <div 
              v-else 
              :class="['w-10 h-10 rounded-xl flex items-center justify-center', notification.bg, notification.color]"
            >
              <UIcon :name="notification.icon" class="w-5 h-5" />
            </div>
            
            <!-- Type badge for avatar notifications -->
            <div v-if="notification.avatar" :class="['absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0A1220]', notification.bg]">
               <UIcon :name="notification.icon" :class="['w-3 h-3', notification.color]" />
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 :class="['text-base font-bold truncate', notification.read ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-white']">
                  {{ notification.title }}
                </h3>
              </div>
              <p :class="['text-sm leading-relaxed mb-3', notification.read ? 'text-slate-500 dark:text-slate-400' : 'text-slate-600 dark:text-slate-300 font-medium']">
                {{ notification.description }}
              </p>
              <span class="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
                {{ notification.time }}
              </span>
            </div>
            
            <!-- Actions -->
            <div class="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 mt-4 sm:mt-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
               <UButton color="neutral" variant="outline" size="sm" class="text-xs font-semibold px-4">Consulter</UButton>
               <UButton 
                 color="neutral" 
                 variant="ghost" 
                 :icon="notification.read ? 'i-lucide-mail-unread' : 'i-lucide-check'" 
                 class="text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                 @click="toggleReadStatus(notification.id)"
                 :title="notification.read ? 'Marquer comme non lu' : 'Marquer comme lu'"
               />
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div 
        v-if="filteredNotifications.length === 0" 
        class="flex flex-col items-center justify-center py-20 text-center animate-fade-in"
      >
        <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
          <UIcon name="i-lucide-bell-off" class="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucune notification</h3>
        <p class="text-slate-500 dark:text-slate-400 max-w-sm">
          {{ activeTab === 'all' ? "Vous êtes à jour ! Il n'y a aucune nouvelle activité pour le moment." : "Vous n'avez pas de notifications de ce type." }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
