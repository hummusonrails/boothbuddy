<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center p-6" :style="gradientStyle">
    <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      <div class="lg:w-1/2 flex flex-col justify-center items-start text-left">
        <h1 class="text-5xl font-bold mb-6" style="color: #4A154B">{{ company.name }}</h1>
        <h3 class="text-2xl font-bold mb-4" style="color: #721C24">{{ company.event }}</h3>
        <div class="text-lg mb-6" v-html="company.description" style="color: #333333"></div>
        <button @click="reAnalyze" class="bg-white text-pink-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-700 transition-colors mr-4">Re-Analyze</button>
        <button @click="backToDashboard" class="bg-white text-pink-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-700 transition-colors">Back to Dashboard</button>
      </div>
      <div class="lg:w-1/2 mt-10 lg:mt-0">
        <div class="bg-pink-200 p-1 rounded-lg shadow-lg" style="background-color: #FADADD">
          <div class="bg-white p-6 rounded-lg">
            <img class="w-full h-auto drop-shadow-lg" :src="imageUrl" alt="Company Image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoothStore } from '~/stores/boothStore';
import { boothService } from '~/services/boothService';
import { marked } from 'marked';
import { analyzeImageWithAI } from '~/services/analyzeImage';

const route = useRoute();
const router = useRouter();
const company = ref({ name: '', description: '', event: '', imageId: '' });
const imageUrl = ref('');

const gradientStyle = computed(() => ({
  background: `url('/bg_gradient.jpg')`,
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed'
}));

const fetchCompanyDetails = async () => {
  const boothStore = useBoothStore();
  const companyId = route.params.id;
  const result = await boothStore.getBooth(companyId);
  company.value = result;
  imageUrl.value = boothService.getImageUrl(result.imageId);
  convertDescriptionToHtml(result.description);
};

const convertDescriptionToHtml = (markdown) => {
  const cleanedMarkdown = markdown.replace(/```/g, '');
  company.value.description = marked(cleanedMarkdown);
};

const reAnalyze = async () => {
  const imageUrlValue = boothService.getImageUrl(company.value.imageId);
  const eventName = company.value.event;

  try {
    const response = await fetch(imageUrlValue);
    if (response.ok) {
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64ImageContent = reader.result;
        if (base64ImageContent.startsWith('data:image/')) {
          const base64Data = base64ImageContent.split(';base64,').pop();
          await analyzeImageWithAI(base64Data, company.value.imageId, company.value.$id, eventName);
          await fetchCompanyDetails(); // Refresh company details
        } else {
          console.error('The file content is not a valid base64 image.');
        }
      };

      reader.onerror = () => {
        console.error('Error occurred while reading the blob.');
      };

      reader.readAsDataURL(blob);
    } else {
      console.error('Failed to fetch image:', response.statusText);
    }
  } catch (error) {
    console.error('Error in reAnalyze:', error);
  }
};




const backToDashboard = () => {
  router.push('/dashboard');
};

onMounted(fetchCompanyDetails);
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
