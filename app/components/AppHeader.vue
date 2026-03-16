<script setup lang="ts">
</script>

<template>
  <header class="h-16 border-b border-slate-800 flex items-center justify-end px-6 gap-6 bg-[#050C16]/80 backdrop-blur top-0 sticky z-10">
    <!-- Notifications -->
    <UButton color="neutral" variant="ghost" icon="i-lucide-bell" class="relative">
      <UBadge color="primary" class="absolute -top-1 -right-1 leading-none p-1 w-4 h-4 flex items-center justify-center rounded-full text-[10px]" size="sm">4</UBadge>
    </UButton>

    <!-- Profile -->
    <div class="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors">
      <div class="flex flex-col items-end">
        <span class="text-xs text-slate-400">User</span>
        <span class="text-sm font-semibold text-white">Alex R.</span>
      </div>
      <UAvatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" alt="Alex R." />
      <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-slate-400" />
    </div>
  </header>
</template>
