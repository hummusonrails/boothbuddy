import { useNuxtApp } from '#app';
import { useBoothStore } from '~/stores/boothStore';
import { Client, Functions } from 'appwrite';

export const analyzeImageWithAI = async (base64Data, fileId, companyId, eventName) => {
    const nuxtApp = useNuxtApp();
    const config = useRuntimeConfig();
    const boothStore = useBoothStore();
    const client = new Client().setEndpoint(config.public.appwriteEndpoint).setProject(config.public.appwriteProjectId);
    const functions = new Functions(client);
  
    const questionTemplate = process.env.VUE_APP_ANALYSIS_QUESTION;
    const question = questionTemplate.replace('%EVENT_NAME%', eventName);
      
    try {
      const functionData = { imageBase64: base64Data, question: question };
      const execution = await functions.createExecution(config.public.appWriteAiFunctionId, JSON.stringify(functionData));
  
      if (execution.status === 'completed' && execution.responseBody) {
        const analysisResult = JSON.parse(execution.responseBody);
        if (analysisResult && analysisResult.description) {
          const updatedBoothData = { description: analysisResult.description, imageId: fileId };
          await boothStore.updateBooth(companyId, updatedBoothData);
        }
      }
    } catch (error) {
      console.error('Error invoking Appwrite function:', error);
    }
  };
  

