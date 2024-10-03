/** @format */

import React, { ComponentType } from 'react';
import HeaderComponent from './Header';

const WithLayout = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  return ({ ...props }: P) => {
    return (
      <div className="h-screen overflow-hidden">
        <HeaderComponent />
        <main className="bg-custom-gradient h-full">
          <WrappedComponent {...(props as P)} />
        </main>
      </div>
    );
  };
};

export default WithLayout;
