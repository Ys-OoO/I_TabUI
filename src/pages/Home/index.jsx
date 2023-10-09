import { Outlet } from '@umijs/max';

const Home = () => {
  return (
    <div>
      Home
      {/* TODO 下拉 */}
      <Outlet />
    </div>
  );
};

export default Home;
