import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hero from './routes/Hero/Hero';

// Separate in a different Chunk the configurator module to optimize the initial load time
const ConfiguratorChunk = React.lazy(() => import('./routes/Configurator/Configurator')); //Type Inference React.LazyExoticComponent<React.FC>

// Loader UI for transition to the configurator route
const SceneLoader: React.FC = () => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
    <p>Initializing virtual environment...</p>
  </div>
);

// Data router API to map the URL to the corresponding React components.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
  },
  {
    path: '/configurator/:vehicleId',
    element: (
      // Suspense is used to handle asynchronous (lazy) loading of the ConfiguratorChunk.
      <Suspense fallback={<SceneLoader />}> 
        <ConfiguratorChunk />
      </Suspense>
    ),
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />; //The app contains the router provider setted up with our routes configuration.
};

export default App;