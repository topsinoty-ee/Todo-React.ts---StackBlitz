/** @format */

import React from 'react';

const HeaderComponent: React.FC = () => {
  return (
    <header className="navbar bg-base-200 justify-end">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Add New
      </button>
    </header>
  );
};

export default HeaderComponent;
