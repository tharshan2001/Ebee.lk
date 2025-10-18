import React from 'react';
import Layout from './Layout';

const AdminLayout = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default AdminLayout;
