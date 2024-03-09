import { Outlet } from 'react-router-dom';

const FullLayoutRenderer = () => {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default FullLayoutRenderer;
