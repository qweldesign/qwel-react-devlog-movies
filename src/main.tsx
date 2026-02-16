import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import Header from './Header.tsx';
import MovieList from './MovieList.tsx';
import MovieDetail from './MovieDetail.tsx';

const router = createBrowserRouter([
  { path: '/', Component: MovieList },
  { path: '/:movieId', Component: MovieDetail },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header>
      <RouterProvider router={router} />
    </Header>
  </StrictMode>
);
