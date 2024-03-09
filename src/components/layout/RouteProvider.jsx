import { Routes, Route } from 'react-router-dom';
import routes from '@/router/routes';
import LayoutRenderer from './LayoutRenderer';

const RouteProvider = () => {
  return (
    <Routes>
      <Route element={<LayoutRenderer />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default RouteProvider;
