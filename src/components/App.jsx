import { Route, Switch } from 'react-router';
import MovieTemplate from './MovieTemplate/MovieTemplate';

const App = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        component={MovieTemplate}
      />
    </Switch>
  );
}

export default App;
