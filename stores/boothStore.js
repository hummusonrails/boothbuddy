import { defineStore } from 'pinia';
import { boothService } from '~/services/boothService';

export const useBoothStore = defineStore('booth', {
  state: () => ({
    booths: [],
  }),
  actions: {
    async fetchBooths() {
      const result = await boothService.getBooths();
      this.booths = result.documents;
      return result;
    },

    async addBooth(boothData) {
      const result = await boothService.createBooth(boothData);
      this.booths.push(result);
      return result;
    },

    async updateBooth(boothId, boothData) {
      const updatedBooth = await boothService.updateBooth(boothId, boothData);
      const index = this.booths.findIndex(booth => booth.$id === boothId);
      if (index !== -1) {
        this.booths[index] = updatedBooth;
      }
      return updatedBooth;
    },

    async deleteBooth(boothId) {
      await boothService.deleteBooth(boothId);
      this.booths = this.booths.filter(booth => booth.$id !== boothId);
    },

    async getBooth(boothId) {
      try {
        const booth = await boothService.getBooth(boothId);
        return booth;
      } catch (error) {
        console.error('Error fetching specific booth:', error);
        throw error;
      }
    },
  },
});
