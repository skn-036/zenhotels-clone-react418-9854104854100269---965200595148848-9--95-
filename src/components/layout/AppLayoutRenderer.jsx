import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';

const AppLayoutRenderer = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayoutRenderer;
