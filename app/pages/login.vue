<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const router = useRouter()
const authState = useCookie('auth_token')

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const login = async () => {
  error.value = ''
  loading.value = true

  // Simulate network request
  setTimeout(() => {
    loading.value = false

    // Accept anything for the demo
    if (form.value.email && form.value.password) {
      authState.value = 'dummy-token'
      router.push('/')
    } else {
      error.value = 'Identifiants invalides. Veuillez réessayer.'
    }
  }, 1000)
}
</script>

<template>
  <div class="fade-in">
    <!-- Mobile Header (Hidden on Desktop) -->
    <div class="flex lg:hidden items-center gap-3 mb-10">
      <div
        class="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/30 shadow-[0_0_20px_rgba(0,218,255,0.2)]">
        <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-violet-400" />
      </div>
      <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white uppercase mt-1">Praetoria</span>
    </div>

    <div class="mb-10">
      <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Bon retour</h2>
      <p class="text-slate-500 dark:text-slate-400">Entrez vos identifiants pour accéder au tableau de bord.</p>
    </div>

    <form @submit.prevent="login" class="flex flex-col space-y-8">

      <UFormGroup label="Adresse e-mail" required>
        <UInput v-model="form.email" type="email" size="xl" icon="i-heroicons-envelope" placeholder="nom@entreprise.com"
          color="neutral" variant="outline" class="w-full"
          :ui="{ base: 'bg-white hover:bg-slate-50 dark:bg-[#0A1220] dark:hover:bg-slate-900 text-slate-900 dark:text-white ring-1 ring-slate-300 dark:ring-slate-800 focus:ring-violet-500 transition-colors shadow-none w-full' }" />
      </UFormGroup>

      <UFormGroup required>
        <template #label>
          <div class="flex justify-between items-center w-full">
            <span>Mot de passe</span>
            <a href="#" class="text-xs font-semibold text-violet-500 hover:text-violet-400 transition-colors">Mot de passe
              oublié ?</a>
          </div>
        </template>
        <UInput v-model="form.password" type="password" size="xl" icon="i-heroicons-lock-closed" placeholder="••••••••"
          color="neutral" variant="outline" class="w-full"
          :ui="{ base: 'bg-white hover:bg-slate-50 dark:bg-[#0A1220] dark:hover:bg-slate-900 text-slate-900 dark:text-white ring-1 ring-slate-300 dark:ring-slate-800 focus:ring-violet-500 transition-colors shadow-none w-full' }" />
      </UFormGroup>

      <UAlert v-if="error" color="error" variant="soft" title="Échec de l'authentification" :description="error"
        icon="i-lucide-alert-circle" />

      <UButton type="submit" :loading="loading" block size="xl" icon="i-heroicons-arrow-right-end-on-rectangle"
        label="Se connecter"
        class="mt-6 h-12 shadow-[0_0_15px_rgba(0,218,255,0.2)] hover:shadow-[0_0_25px_rgba(0,218,255,0.4)] font-bold tracking-wide transition-all" />

      <div class="relative py-4 border-t border-slate-200 dark:border-slate-800 mt-10">
        <div
          class="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-50 dark:bg-[#050C16] px-3 text-xs text-slate-500 uppercase font-semibold tracking-wider">
          Ou continuer avec
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <UButton color="neutral" variant="outline" label="GitHub" icon="i-simple-icons-github" block
          class="bg-white dark:bg-[#0A1220] ring-slate-300 dark:ring-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300" />
        <UButton color="neutral" variant="outline" label="Google" icon="i-simple-icons-google" block
          class="bg-white dark:bg-[#0A1220] ring-slate-300 dark:ring-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300" />
      </div>

    </form>

    <p class="text-center text-sm text-slate-500 mt-14">
      Vous n'avez pas de compte ? <a href="#"
        class="font-semibold text-slate-900 dark:text-white hover:text-violet-500 dark:hover:text-violet-400 transition-colors">S'inscrire maintenant</a>
    </p>

  </div>
</template>

<style scoped>
.fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
