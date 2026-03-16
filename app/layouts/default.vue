<template>
  <div class="flex min-h-screen bg-[#050C16] text-white font-sans antialiased">
    <AppSidebar />
    <div class="flex-1 flex flex-col min-h-screen relative overflow-hidden">
      <AppHeader />
      <main class="flex-1 p-6 md:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
