import { useNuxtApp } from '#app';
import { useBoothStore } from '~/stores/boothStore';

export const analyzeImageWithAI = async (base64Data, fileId, companyId, eventName) => {
  if (!base64Data || !fileId || !companyId || !eventName) {
    throw new Error('Invalid input parameters');
  }

  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const boothStore = useBoothStore();

  const client = nuxtApp.$appwriteClient;
  const functions = nuxtApp.$appwriteFunctions;

  if (!client || !functions) {
    console.error('Appwrite client or functions not initialized');
    return;
  }

  const questionTemplate = config.public.VUE_APP_ANALYSIS_QUESTION;
  console.log('Question template:', questionTemplate);
  console.log('Event name:', eventName);
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
