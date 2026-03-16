<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('profile')

const tabs = [
  { label: 'Profile', key: 'profile', icon: 'i-lucide-user' },
  { label: 'Account', key: 'account', icon: 'i-lucide-shield' },
  { label: 'Notifications', key: 'notifications', icon: 'i-lucide-bell' },
  { label: 'Billing', key: 'billing', icon: 'i-lucide-credit-card' }
]

const profileForm = ref({
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@example.com',
  bio: 'Passionate Frontend Developer currently deeply exploring the Nuxt ecosystem and Vue 3.',
  title: 'Senior UI/UX Engineer'
})

const notifications = ref({
  emailCourseUpdates: true,
  emailCommunityReplies: true,
  emailChallenges: false,
  pushMentions: true,
  pushDirectMessages: true
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <!-- Header Selection -->
    <div class="pb-6 border-b border-slate-200 dark:border-slate-800/50 mb-8">
       <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">Settings</h1>
       <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage your account preferences, profile details, and billing information.</p>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <div class="w-full md:w-64 flex-shrink-0">
        <nav class="flex flex-row md:flex-col gap-1 overflow-x-auto pb-4 md:pb-0">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap',
              activeTab === tab.key 
                ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            <UIcon :name="tab.icon" class="w-5 h-5" />
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1">
        <!-- Profile Settings -->
        <div v-if="activeTab === 'profile'" class="space-y-8 animate-fade-in">
          <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm" :ui="{ body: 'p-6 sm:p-8', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Public Profile</h2>
            
            <div class="flex items-center gap-6 mb-8">
               <UAvatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex Rivera" size="3xl" class="border-4 border-white dark:border-[#0A1220] shadow-sm" />
               <div class="flex gap-3">
                 <UButton color="gray" variant="solid">Change Avatar</UButton>
                 <UButton color="red" variant="ghost">Remove</UButton>
               </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <UFormGroup label="First Name" required>
                <UInput v-model="profileForm.firstName" placeholder="Jane" />
              </UFormGroup>
              <UFormGroup label="Last Name" required>
                <UInput v-model="profileForm.lastName" placeholder="Doe" />
              </UFormGroup>
            </div>

             <UFormGroup label="Professional Title" class="mb-6">
                <UInput v-model="profileForm.title" placeholder="e.g. Frontend Developer" />
             </UFormGroup>

            <UFormGroup label="Bio" description="Brief description for your profile. URLs are hyperlinked." class="mb-6">
              <UTextarea v-model="profileForm.bio" resize autoresize :rows="4" />
            </UFormGroup>

            <div class="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/50">
               <UButton color="primary" variant="solid" class="font-bold px-6">Save Changes</UButton>
            </div>
          </UCard>
        </div>

        <!-- Account Settings -->
        <div v-else-if="activeTab === 'account'" class="space-y-8 animate-fade-in">
           <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm" :ui="{ body: 'p-6 sm:p-8', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }">
             <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Account Details</h2>
             
             <UFormGroup label="Email Address" required class="mb-6">
                <UInput v-model="profileForm.email" type="email" icon="i-lucide-mail" />
             </UFormGroup>

             <UFormGroup label="Password" class="mb-6">
                <UInput type="password" value="********" disabled />
                <template #help>
                   <UButton variant="link" color="primary" class="p-0 mt-1">Change Password</UButton>
                </template>
             </UFormGroup>

             <!-- Danger Zone -->
             <div class="mt-12 pt-8 border-t border-red-200 dark:border-red-900/30">
                <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                <p class="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <UButton color="red" variant="outline" class="font-bold">Delete Account</UButton>
             </div>
           </UCard>
        </div>

        <!-- Notifications Settings -->
        <div v-else-if="activeTab === 'notifications'" class="space-y-8 animate-fade-in">
           <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm" :ui="{ body: 'p-6 sm:p-8', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }">
             <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Email Notifications</h2>
             <div class="space-y-6">
               <UFormGroup label="Course Updates" description="Get notified about new courses and major curriculum changes.">
                 <div class="mt-2"><UToggle v-model="notifications.emailCourseUpdates" color="primary" /></div>
               </UFormGroup>
               <UFormGroup label="Community Replies" description="Receive emails when someone replies to your forum posts.">
                 <div class="mt-2"><UToggle v-model="notifications.emailCommunityReplies" color="primary" /></div>
               </UFormGroup>
               <UFormGroup label="Challenges & Hackathons" description="Weekly digest of upcoming coding challenges.">
                 <div class="mt-2"><UToggle v-model="notifications.emailChallenges" color="primary" /></div>
               </UFormGroup>
             </div>
             
             <h2 class="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-6 border-t border-slate-100 dark:border-slate-800/50 pt-8">Push Notifications</h2>
             <div class="space-y-6">
               <UFormGroup label="Mentions" description="Notify me when someone @mentions me in the community.">
                 <div class="mt-2"><UToggle v-model="notifications.pushMentions" color="primary" /></div>
               </UFormGroup>
               <UFormGroup label="Direct Messages" description="Notify me when I receive a direct message.">
                 <div class="mt-2"><UToggle v-model="notifications.pushDirectMessages" color="primary" /></div>
               </UFormGroup>
             </div>
           </UCard>
        </div>

        <!-- Billing Settings -->
        <div v-else-if="activeTab === 'billing'" class="space-y-8 animate-fade-in">
           <UCard class="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg relative overflow-hidden" :ui="{ body: 'p-8' }">
             <div class="absolute -right-12 -top-12 w-48 h-48 bg-cyan-500 rounded-full blur-3xl opacity-20"></div>
             
             <div class="flex justify-between items-start relative z-10">
                <div>
                  <h2 class="text-2xl font-bold text-white mb-2">Praetoria Pro</h2>
                  <p class="text-slate-300">Your next billing date is <span class="text-white font-bold">April 15, 2024</span>.</p>
                </div>
                <UBadge color="cyan" variant="solid" class="font-bold">Active</UBadge>
             </div>
             
             <div class="mt-8 pt-6 border-t border-slate-700 flex gap-4 relative z-10">
               <UButton color="white" variant="solid" class="font-bold text-slate-900">Manage Subscription</UButton>
               <UButton color="gray" variant="ghost" class="text-slate-300 hover:text-white">View Invoices</UButton>
             </div>
           </UCard>

           <h3 class="font-bold text-slate-900 dark:text-white mt-8 mb-4">Payment Methods</h3>
           <UCard class="bg-white dark:bg-[#0A1220] border-slate-200 dark:border-slate-800 shadow-sm" :ui="{ body: 'p-6', ring: 'ring-1 ring-slate-200 dark:ring-slate-800' }">
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-sm font-bold text-slate-500">VISA</div>
                  <div>
                    <div class="font-medium text-slate-900 dark:text-white">Visa ending in 4242</div>
                    <div class="text-xs text-slate-500">Expires 12/26</div>
                  </div>
                </div>
                <UButton color="gray" variant="ghost" size="sm">Edit</UButton>
             </div>
           </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
