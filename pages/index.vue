<template>
  <div id="app" class="overflow-hidden">
    <!-- Header -->
    <div class="py-6" style="background-image: url('/bg_gradient.jpg');">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Welcome to BoothBuddy!</h1>
            <p class="text-lg text-gray-800" v-if="isAuthenticated">
              Access your booth analysis tools below.
            </p>
            <p class="text-lg text-gray-800" v-else>
              Your digital companion for navigating vendor booths with ease.
            </p>
          </div>
          <div>
            <nuxt-link v-if="isAuthenticated" to="/dashboard" class="bg-white text-pink-600 font-semibold py-2 px-4 rounded-lg mr-2">
              Dashboard
            </nuxt-link>
            <nuxt-link v-if="!isAuthenticated" to="/login" class="font-semibold py-2 px-4 rounded-lg mr-2 text-gray-800">
              Login
            </nuxt-link>
            <nuxt-link to="/capture/new" class="bg-white text-pink-600 font-semibold py-2 px-4 rounded-lg">
              Capture New Image
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div v-if="isAuthenticated" class="rounded-lg shadow-lg p-6 mb-6" style="background-image: url('/bg_gradient.jpg');">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Welcome Back!</h2>
        <p class="text-gray-800">Access your booth analysis tools below:</p>
        <nav class="mt-8 flex flex-col space-y-4">
          <nuxt-link to="/dashboard" class="text-pink-800 hover:text-pink-900">Dashboard</nuxt-link>
          <nuxt-link to="/capture/new" class="text-pink-800 hover:text-pink-900">Capture New Image</nuxt-link>
        </nav>
      </div>

      <div v-else class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Get Started!</h2>
        <p class="text-gray-700">Your digital companion for navigating vendor booths with ease. Sign up or log in to get started.</p>
        <nav class="mt-8 flex flex-col space-y-4">
          <nuxt-link to="/login" class="text-blue-500 hover:text-blue-700">Login</nuxt-link>
          <nuxt-link to="/register" class="text-blue-500 hover:text-blue-700">Register</nuxt-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
