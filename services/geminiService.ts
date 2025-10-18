/**
 * Simulates generating an image from a text prompt.
 * In a real application, this would call an AI image generation API.
 * @param prompt The text description of the image to generate.
 * @returns A promise that resolves to a placeholder image URL.
 */
export async function generateImage(prompt: string): Promise<string> {
  console.log(`Simulating image generation for prompt: "${prompt}"`);

  // Simulate network delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate a potential error for demonstration purposes
  if (prompt.toLowerCase().includes("error")) {
    throw new Error("Mock API error: The prompt contained a forbidden word.");
  }

  // Return a dynamic placeholder image from a service like picsum.photos
  // Using a simple hash of the prompt as a seed for variety
  const seed = prompt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}/1024/1024`;
}