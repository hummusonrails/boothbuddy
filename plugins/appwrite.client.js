import { defineNuxtPlugin } from '#app';
import { Client, Account, Databases, Storage } from 'appwrite';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = new Client().setEndpoint(config.public.appwriteEndpoint).setProject(config.public.appwriteProjectId);

  const account = new Account(client);
  const database = new Databases(client, config.public.appwriteBoothDatabaseId);
  const storage = new Storage(client);

  nuxtApp.provide('appwriteAccount', account);
  nuxtApp.provide('appwriteDatabase', database);
  nuxtApp.provide('appwriteStorage', storage);
});
