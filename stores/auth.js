import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    session: null,
  }),
  actions: {
    async initialize() {
      const nuxtApp = useNuxtApp();
      const account = nuxtApp.$appwriteAccount;

      try {
        const user = await account.get();
        if (user) {
          this.user = user;
          this.isAuthenticated = true;
        }
      } catch (error) {
        if (!(error instanceof AppwriteException && error.code === 401)) {
          console.error('Unexpected error during initialization:', error);
        }
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async register(email, password) {
      const nuxtApp = useNuxtApp();
      const account = nuxtApp.$appwriteAccount;

      try {
        const user = await account.create('unique()', email, password);
        this.user = user;
        this.isAuthenticated = !!user;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },

    async login(email, password) {
      const nuxtApp = useNuxtApp();
      const account = nuxtApp.$appwriteAccount;

      try {
        await account.createEmailSession(email, password);
        const user = await account.get();
        this.user = user;
        this.isAuthenticated = !!user;
        return true; 
      } catch (error) {
        console.error('Login error:', error);
        this.user = null;
        this.isAuthenticated = false;
        return false; 
      }
    },

    async logout() {
      const nuxtApp = useNuxtApp();
      const account = nuxtApp.$appwriteAccount;

      try {
        await account.deleteSession('current');
        this.user = null;
        this.isAuthenticated = false;
        return true;
      } catch (error) {
        console.error('Logout error:', error);
        return false; 
      }
    },
  },
});
