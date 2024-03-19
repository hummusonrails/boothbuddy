<template>
  <div class="p-4 max-w-md mx-auto mt-20 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center text-gray-800">Login to BoothBuddy</h1>
    <form @submit.prevent="login" class="mt-6">
      <div class="mt-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input type="email" id="email" v-model="email" class="mt-1 p-3 border rounded w-full" required placeholder="Enter your email">
      </div>
      <div class="mt-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input type="password" id="password" v-model="password" class="mt-1 p-3 border rounded w-full" required placeholder="Enter your password">
      </div>
      <button type="submit" class="mt-6 w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-50">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useAuthStore } from '~/stores/auth';

const email = ref('');
const password = ref('');
const nuxtApp = useNuxtApp();
const authStore = useAuthStore();

const login = async () => {
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      nuxtApp.$router.push('/dashboard');
    } else {
      console.log('Login action did not indicate success.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
</script>

<style>
</style>
