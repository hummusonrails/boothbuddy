<template>
  <div class="p-4 max-w-md mx-auto mt-20 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center text-gray-800">Register for BoothBuddy</h1>
    <form @submit.prevent="register" class="mt-6">
      <div class="mt-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" class="mt-1 p-3 border rounded w-full" required placeholder="Enter your email">
      </div>
      <div class="mt-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" class="mt-1 p-3 border rounded w-full" required placeholder="Create your password">
      </div>
      <button type="submit" class="mt-6 w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const nuxtApp = useNuxtApp();
    const authStore = useAuthStore();

    const register = async () => {
      try {
        await authStore.register(email.value, password.value);
        nuxtApp.$router.push({ path: '/dashboard' });
      } catch (error) {
        console.error('Error registering:', error);
      }
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>
