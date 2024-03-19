<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow bg-[url('/bg_gradient.jpg')] bg-cover mx-2 mt-4 mb-2 p-8">
      <h1 class="text-3xl font-bold text-center text-black">Dashboard</h1>

      <!-- Capture and Analyze Section -->
      <section class="mt-6 text-center">
        <h2 class="text-lg font-semibold text-black">Capture Company Booth for Analysis</h2>
        <button @click="captureNew" class="mt-2 px-4 py-2 bg-white text-pink-600 rounded-lg hover:bg-gray-100">
          Capture New Image
        </button>
      </section>

      <!-- Search Bar Section -->
      <section class="mt-6">
        <h2 class="text-lg font-semibold text-center text-black">Search Analyzed Companies</h2>
        <div class="mt-2 flex justify-center">
          <input type="text" v-model="searchTerm" @input="searchBooths" placeholder="Search..." class="p-3 border rounded w-1/2">
        </div>
      </section>

      <!-- Results Table Section -->
      <section class="mt-6 mb-2">
        <h2 class="text-lg font-semibold text-center text-black">Analyzed Companies</h2>
        <div class="mt-2 overflow-x-auto">
          <table class="w-full border-collapse border border-white">
            <thead>
              <tr>
                <th class="border p-2 text-black">Company Name</th>
                <th class="border p-2 text-black">Event</th>
                <th class="border p-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in filteredRecords" :key="record.$id">
                <td class="border p-2 text-black">{{ record.name }}</td>
                <td class="border p-2 text-black">
                  <input v-model="record.event" class="border p-1 rounded w-full" />
                </td>
                <td class="border p-2 text-center">
                  <button @click="viewMore(record.$id)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    View More
                  </button>
                  <button @click="updateBooth(record)" class="mx-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700">
                    Update
                  </button>
                  <button @click="deleteBooth(record.$id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useBoothStore } from '~/stores/boothStore';

export default {
  middleware: 'authenticated',
  data() {
    return {
      searchTerm: '',
      records: { documents: [] },
      allRecords: [],
    };
  },
  computed: {
    filteredRecords() {
      if (!this.searchTerm) {
        return this.records.documents;
      }
      return this.records.documents.filter(record => 
        record.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  async mounted() {
    const boothStore = useBoothStore();
    const result = await boothStore.fetchBooths();
    this.records.documents = result.documents;
    this.allRecords = result.documents;
  },
  methods: {
    captureNew() {
      this.$router.push({ path: '/capture/new' });
    },
    viewMore(boothId) {
      this.$router.push({ path: `/company-details/${boothId}` });
    },
    async updateBooth(booth) {
      const boothStore = useBoothStore();
      const data = {
        event: booth.event,
      }
      await boothStore.updateBooth(booth.$id, data);
    },
    async deleteBooth(boothId) {
      const boothStore = useBoothStore();
      await boothStore.deleteBooth(boothId);
      this.records.documents = this.records.documents.filter(record => record.$id !== boothId);
    },
    searchBooths() {
      this.records.documents = this.allRecords.filter(record => 
        record.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>
