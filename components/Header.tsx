import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
        AI kép elemző
      </h1>
      <p className="text-lg text-white">
        Tölts fel egy AI által generált képet, és mi megpróbáljuk kitalálni a promptot.
      </p>
    </header>
  );
};

export default Header;