<template>
  <div class="flex min-h-screen bg-slate-50 dark:bg-[#050C16] text-slate-900 dark:text-white font-sans antialiased transition-colors duration-300">
    <AppSidebar />
    <div class="flex-1 flex flex-col min-h-screen relative overflow-hidden">
      <AppHeader />
      <main class="flex-1 p-6 md:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
