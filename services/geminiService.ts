import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an image using the Imagen 2 model from a text prompt.
 * @param prompt The text description of the image to generate.
 * @returns A promise that resolves to a base64 encoded JPEG image data URL.
 */
export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The response may be empty or contain safety blocks.");
    }
  } catch (error) {
    console.error("Error generating image with the AI API:", error);
    if (error instanceof Error) {
        throw new Error(`AI API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the AI API.");
  }
}