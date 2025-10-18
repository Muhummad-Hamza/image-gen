import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setImageUrl(null);
    setError(null);

    try {
      const generatedImageUrl = await generateImage(prompt);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate image: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <p className="text-center text-lg text-slate-400 mb-8">
            Describe anything you can imagine, and let our AI bring it to life in a stunning visual.
          </p>
          <PromptForm onGenerate={handleGenerateImage} isLoading={isLoading} />
          <ImageDisplay isLoading={isLoading} imageUrl={imageUrl} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;