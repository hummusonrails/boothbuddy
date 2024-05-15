import { defineNuxtPlugin } from '#app';
import { Client, Account, Databases, Storage, Functions } from 'appwrite';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const client = new Client().setEndpoint(config.public.appwriteEndpoint).setProject(config.public.appwriteProjectId);

  const account = new Account(client);
  const database = new Databases(client, config.public.appwriteBoothDatabaseId);
  const storage = new Storage(client);
  const functions = new Functions(client);

  nuxtApp.provide('appwriteClient', client);
  nuxtApp.provide('appwriteFunctions', functions);
  nuxtApp.provide('appwriteAccount', account);
  nuxtApp.provide('appwriteDatabase', database);
  nuxtApp.provide('appwriteStorage', storage);
});
