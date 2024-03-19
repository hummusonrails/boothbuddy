import { Query, ID, Permission, Role } from 'appwrite';

export const boothService = {
    async createBooth(boothData) {
      const nuxtApp = useNuxtApp();
      const account = nuxtApp.$appwriteAccount;
      const database = nuxtApp.$appwriteDatabase;
    
      const user = await account.get();  
      boothData.userId = user.$id;
  
      const result = await database.createDocument(
        nuxtApp.$config.public.appWriteBoothDatabaseId,
        nuxtApp.$config.public.appwriteBoothCollectionId,
        ID.unique(),
        boothData,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      );
  
      return result;
    },

    async getBooth(boothId) {
      const nuxtApp = useNuxtApp();
      const database = nuxtApp.$appwriteDatabase;
    
      try {
        const result = await database.getDocument(
          nuxtApp.$config.public.appWriteBoothDatabaseId,
          nuxtApp.$config.public.appwriteBoothCollectionId,
          boothId
        );
    
        return result;
      } catch (error) {
        console.error('Error fetching booth:', error);
        throw error;
      }
    },
  
  async getBooths() {
    const nuxtApp = useNuxtApp();
    const database = nuxtApp.$appwriteDatabase;
    const account = nuxtApp.$appwriteAccount;
  
    try {
      const user = await account.get();
      const userId = user.$id;
  
      const result = await database.listDocuments(
        nuxtApp.$config.public.appWriteBoothDatabaseId,
        nuxtApp.$config.public.appwriteBoothCollectionId,
        [
          Query.equal('userId', userId)
        ]
      );
  
      return result;
    } catch (error) {
      console.error('Error fetching booths:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      throw error;
    }
  },
  
  
    async updateBooth(boothId, boothData) {
      const nuxtApp = useNuxtApp();
      const database = nuxtApp.$appwriteDatabase;
    
      const result = await database.updateDocument(
        nuxtApp.$config.public.appWriteBoothDatabaseId,
        nuxtApp.$config.public.appwriteBoothCollectionId,
        boothId,
        boothData
      );
  
      return result;
    },
    
    async deleteBooth(boothId) {
      const nuxtApp = useNuxtApp();
      const database = nuxtApp.$appwriteDatabase;
      const storage = nuxtApp.$appwriteStorage;

      try {
        const booth = await database.getDocument(
          nuxtApp.$config.public.appWriteBoothDatabaseId,
          nuxtApp.$config.public.appwriteBoothCollectionId,
          boothId
        );
        const imageId = booth.imageId;

        await database.deleteDocument(
          nuxtApp.$config.public.appWriteBoothDatabaseId,
          nuxtApp.$config.public.appwriteBoothCollectionId,
          boothId
        );

        if (imageId) {
          try {
            await storage.deleteFile(
              nuxtApp.$config.public.appWriteBoothBucketId,
              imageId
            );
          } catch (imageError) {
            if (imageError.code === 404) {
              console.warn('Image was not found, but proceeding with booth deletion:', imageError);
            } else {
              throw imageError;
            }
          }
        }

        return { success: true, message: 'Booth and associated image processed successfully.' };
      } catch (error) {
        console.error('Error deleting booth:', error);
        throw error;
      }
    },

    getImageUrl(fileId) {
      const nuxtApp = useNuxtApp();
      return `${nuxtApp.$config.public.appwriteEndpoint}/storage/buckets/${nuxtApp.$config.public.appWriteBoothBucketId}/files/${fileId}/view?project=${nuxtApp.$config.public.appwriteProjectId}`;
    },    
  };
  
  export default boothService;