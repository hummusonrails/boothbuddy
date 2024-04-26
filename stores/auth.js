import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    session: null,
  }),
  actions: {
    async initialize(nuxtApp, account) {
      try {
        const user = await account.get();
        if (user) {
          this.setUser(user);
        } else {
          this.setUser(null);
        }
      } catch (error) {
        if (!(error instanceof AppwriteException && error.code === 401)) {
          console.error('Unexpected error during initialization:', error);
        }
        await this.logout(); // Call the logout method to clean up user-related state
      }
    },

    setUser(user) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    async register(email, password) {
      const account = this.getAccount();

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
      const account = this.getAccount();

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
      const account = this.getAccount();

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

    getAccount() {
      const nuxtApp = useNuxtApp();
      return nuxtApp.$appwriteAccount;
    },
  },
});
