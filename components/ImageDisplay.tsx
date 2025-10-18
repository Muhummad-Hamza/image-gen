
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

interface ImageDisplayProps {
  isLoading: boolean;
  imageUrl: string | null;
  error: string | null;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, imageUrl, error }) => {
  const SkeletonLoader = () => (
    <div className="w-full aspect-square bg-slate-800 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center animate-pulse">
        <PhotoIcon className="w-16 h-16 text-slate-600" />
    </div>
  );

  const Placeholder = () => (
    <div className="w-full aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-500">
      <PhotoIcon className="w-16 h-16 mb-4" />
      <p className="text-lg font-medium">Your generated image will appear here</p>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="w-full aspect-square bg-red-900/20 border-2 border-dashed border-red-500/50 rounded-lg flex flex-col items-center justify-center text-red-400 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-center font-semibold">Oops! Something went wrong.</p>
        <p className="text-center text-sm">{error}</p>
    </div>
  );

  return (
    <div className="w-full flex justify-center">
        <div className="w-full max-w-xl">
            {isLoading && <SkeletonLoader />}
            {!isLoading && error && <ErrorDisplay />}
            {!isLoading && !error && imageUrl && (
                <img 
                    src={imageUrl} 
                    alt="AI generated" 
                    className="w-full aspect-square object-cover rounded-lg shadow-2xl shadow-purple-900/20 transition-opacity duration-500 opacity-0 animate-fade-in"
                    style={{ animationFillMode: 'forwards' }}
                />
            )}
            {!isLoading && !error && !imageUrl && <Placeholder />}
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out;
            }
        `}</style>
    </div>
  );
};
