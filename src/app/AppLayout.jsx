import React, { useContext } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const { Header, Content } = Layout;

const AppLayout = () => {
  const { authed, handleLogOut } = useContext(AuthContext);

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>
          Second Hand Market
        </div>
        {authed && (
          <div>
            <Dropdown trigger="click" overlay={userMenu}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        )}
      </Header>
      <Content style={{ height: 'calc(100% - 64px)', margin: 20, overflow: 'auto' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
