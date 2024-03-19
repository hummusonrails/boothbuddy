<template>
  <nav class="bg-white text-gray-800 py-2 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <a class="text-xl font-semibold" href="/">BoothBuddy</a>
      <div>
        <span v-if="!isAuthenticated" class="space-x-2">
          <nuxt-link class="text-gray-800 font-medium py-1 px-3 rounded-lg hover:bg-gray-100" to="/login">Login</nuxt-link>
          <nuxt-link class="text-gray-800 font-medium py-1 px-3 rounded-lg hover:bg-gray-100" to="/register">Register</nuxt-link>
        </span>
        <span v-else class="space-x-2">
          <button @click="logout" class="text-gray-800 font-medium py-1 px-3 rounded-lg hover:bg-gray-100">Logout</button>
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
