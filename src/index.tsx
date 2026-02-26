import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.tsx';
import MovieList from './MovieList.tsx';
import MovieDetail from './MovieDetail.tsx';

const router = createBrowserRouter([
  { path: '/', Component: MovieList },
  { path: '/:movieId', Component: MovieDetail },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
