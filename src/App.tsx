import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hero from './routes/Hero/Hero';

// Code-splitting for core application routes 
const ConfiguratorChunk = React.lazy(() => import('./routes/Configurator/Configurator'));

// Loader UI for transition to the configurator route
const SceneLoader: React.FC = () => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <p>Initializing virtual environment...</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
  },
  {
    path: '/configurator/:vehicleId',
    element: (
      <Suspense fallback={<SceneLoader />}>
        <ConfiguratorChunk />
      </Suspense>
    ),
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;