import React from 'react';
import { Outlet } from 'umi';

export default function BasicLayout() {
  return (
    <div>
      BasicLayout
      <Outlet />
    </div>
  );
}
