<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-6">
    <div class="max-w-4xl w-full bg-[url('/bg_gradient.jpg')] bg-cover rounded-lg shadow-lg p-8">
      <h2 class="text-3xl font-bold text-center text-white">{{ isMobileDevice ? 'Capture Image' : 'Upload Image' }}</h2>

      <div class="text-center my-6">
        <label for="company-name" class="text-lg font-semibold text-white">Company Name:</label>
        <input
          id="company-name"
          v-model="companyName"
          type="text"
          placeholder="Enter company name"
          maxlength="120"
          required
          class="mt-3 px-4 py-2 w-full border rounded bg-white"
        />
        <div v-if="companyNameError" class="mt-3 text-sm text-red-500">{{ companyNameError }}</div>
      </div>

      <div class="text-center my-6">
        <label for="event-name" class="text-lg font-semibold text-white">Event Name:</label>
        <input
          id="event-name"
          v-model="eventName"
          type="text"
          placeholder="Enter event name"
          required
          class="mt-3 px-4 py-2 w-full border rounded bg-white"
        />
        <div v-if="eventNameError" class="mt-3 text-sm text-red-500">{{ eventNameError }}</div>
      </div>

      <input
        type="file"
        accept="image/*"
        :capture="isMobileDevice ? 'environment' : null"
        @change="handleFileChange"
        ref="fileInput"
        class="block mx-auto mt-4 file:mr-4 file:py-3 file:px-6 file:rounded file:border-0 file:text-lg file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
      />

      <div class="text-center mt-8">
        <button @click="processImage" class="inline-block bg-white hover:bg-gray-100 text-pink-600 font-bold py-3 px-6 rounded transition-colors">Submit</button>
        <button @click="goBackToDashboard" class="inline-block ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded transition-colors">Back to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNuxtApp, useRuntimeConfig } from '#app';
import { useBoothStore } from '~/stores/boothStore';
import { useRouter } from 'vue-router';
import { ID, Permission, Role, Client, Functions } from 'appwrite';
import { analyzeImageWithAI } from '~/services/analyzeImage';

const isMobileDevice = computed(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();
const boothStore = useBoothStore();

const companyName = ref('');
const eventName = ref('');
const companyNameError = ref('');
const eventNameError = ref('');
const fileInput = ref(null);
const router = useRouter();

const handleFileChange = (event) => {
  if (!event.target.files.length) {
    return;
  }
  companyNameError.value = '';
  eventNameError.value = '';
};

const processImage = async () => {
  if (!companyName.value.trim()) {
    companyNameError.value = 'Company name is required.';
    return;
  }

  if (!eventName.value.trim()) {
    eventNameError.value = 'Event name is required.';
    return;
  }

  if (companyName.value.length > 120) {
    companyNameError.value = 'Company name must be less than 120 characters.';
    return;
  }

  const file = fileInput.value.files[0];
  if (file) {
    await uploadAndCreateCompany(file, eventName.value);
    router.push({ name: 'dashboard' });
  }
};

const createPlaceholderCompany = async (fileId, userId, eventName) => {
  const placeholderData = {
    name: companyName.value.trim(),
    description: 'Analysis pending',
    event: eventName,
    userId: userId,
    imageId: fileId,
  };

  return await boothStore.addBooth(placeholderData);
};

const uploadAndCreateCompany = async (file, eventName) => {
  const storage = nuxtApp.$appwriteStorage;
  const account = nuxtApp.$appwriteAccount;
  const user = await account.get();

  if (!user || !user.$id) {
    console.error('User not found');
    return;
  }

  try {
    const response = await storage.createFile(
      config.public.appWriteBoothBucketId,
      ID.unique(),
      file,
      [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ]
    );

    const newCompany = await createPlaceholderCompany(response.$id, user.$id, eventName);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64ImageContent = reader.result;
      if (base64ImageContent && base64ImageContent.startsWith('data:image/')) {
        const base64Data = base64ImageContent.split(';base64,').pop();
        await analyzeImageWithAI(base64Data, response.$id, newCompany.$id, eventName);
        router.push({ name: 'dashboard' });
      } else {
        console.error('File is not a valid base64 encoded image.');
      }
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};
</script>
