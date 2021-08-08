import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomePage = lazy(() => import('./views/HomePage.js'));
const MoviesPage = lazy(() => import('./views/MoviesPage.js'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage.js'));
const NotFoundView = lazy(() => import('./views/NotFoundView.js'));

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:moviesId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
