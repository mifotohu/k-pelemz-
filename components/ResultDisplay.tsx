import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import CopyIcon from './icons/CopyIcon';

interface ResultDisplayProps {
  result: AnalysisResult;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [copyButtonText, setCopyButtonText] = useState('Másolás');

  const handleCopy = () => {
    navigator.clipboard.writeText(result.prompt).then(() => {
        setCopyButtonText('Másolva!');
        setTimeout(() => {
            setCopyButtonText('Másolás');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert("A másolás sikertelen volt.");
    });
};

  return (
    <div className="mt-8 p-6 bg-bunker/50 border border-comet rounded-lg animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="text-azure mr-3">
          <SparklesIcon />
        </div>
        <h2 className="text-2xl font-bold text-whisper">Elemzési Eredmények</h2>
      </div>

      <div className="space-y-6">
        <div>
           <div className="flex items-center mb-2">
             <h3 className="text-lg font-semibold text-white">Generált Prompt</h3>
           </div>
          <div className="relative">
            <button 
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-comet hover:bg-nevada text-whisper font-semibold py-1 px-3 rounded-md transition-colors duration-200 text-xs z-10"
                aria-label="Prompt másolása vágólapra"
            >
                <CopyIcon />
                <span>{copyButtonText}</span>
            </button>
            <p className="p-4 pt-10 bg-shark rounded-md text-whisper font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {result.prompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;