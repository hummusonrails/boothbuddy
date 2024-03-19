<template>
  <div>
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const authStore = useAuthStore();

    onMounted(() => {
      authStore.initialize();
    });
  },
};
</script>
