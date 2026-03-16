<template>
  <div class="min-h-screen bg-[#050C16] text-white font-sans antialiased flex">
    
    <!-- Left Side: Branding / Visual (Hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0A1220] items-center justify-center p-12 border-r border-slate-800">
      
      <!-- Abstract Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full">
         <!-- Grid Pattern -->
         <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
         <!-- Glowing Orbs -->
         <div class="absolute top-1/4 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]"></div>
         <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 max-w-lg">
        <div class="h-20 w-20 rounded-3xl bg-violet-500/10 flex items-center justify-center border border-violet-500/30 shadow-[0_0_40px_rgba(0,218,255,0.2)] mb-8">
          <UIcon name="i-lucide-shield-check" class="w-10 h-10 text-violet-400" />
        </div>
        <h1 class="text-5xl font-black tracking-tight text-white mb-6 leading-tight">
          Maîtrisez le monde numérique avec <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-500">Praetoria</span>
        </h1>
        <p class="text-lg text-slate-400 leading-relaxed mb-8">
          Accédez à votre tableau de bord premium, suivez votre progression, terminez des défis et gravissez les échelons pour devenir un développeur d'élite.
        </p>
        
        <div class="flex items-center gap-4 text-sm font-medium text-slate-300">
           <div class="flex -space-x-3">
              <UAvatar src="https://i.pravatar.cc/150?u=1" size="sm" class="ring-2 ring-[#0A1220]" />
              <UAvatar src="https://i.pravatar.cc/150?u=2" size="sm" class="ring-2 ring-[#0A1220]" />
              <UAvatar src="https://i.pravatar.cc/150?u=3" size="sm" class="ring-2 ring-[#0A1220]" />
              <div class="w-8 h-8 rounded-full bg-slate-800 ring-2 ring-[#0A1220] flex items-center justify-center text-[10px] text-violet-400 border border-violet-500/30">+2k</div>
           </div>
           <span>Rejoignez des milliers d'apprenants d'élite.</span>
        </div>
      </div>
    </div>

    <!-- Right Side: Auth Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
       <!-- Mobile background glow -->
       <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md bg-violet-500/5 rounded-full blur-[100px] lg:hidden -z-10"></div>
       
       <div class="w-full max-w-sm">
         <slot />
       </div>
    </div>
  </div>
</template>
