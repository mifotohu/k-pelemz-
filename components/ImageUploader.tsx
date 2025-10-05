
import React from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-comet rounded-xl text-center bg-bunker/50 hover:border-azure hover:bg-shark/50 transition-all duration-300">
      <div className="mb-4 text-azure">
        <UploadIcon />
      </div>
      <h2 className="text-xl font-semibold text-whisper mb-2">
        Húzd ide a képet, vagy kattints a feltöltéshez
      </h2>
      <p className="text-white mb-6">
        Támogatott formátumok: PNG, JPG, WEBP
      </p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-azure hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Kép kiválasztása
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;