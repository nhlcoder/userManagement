import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CreateUser from './Component/CreateUser';
import { LoginForm, LoginFormWithNavigation } from './Component/LoginForm';
import UserList from './Component/UserList';
import HomePage from './Component/HomePage';
import UpdateUser from './Component/UpdateUser';

const { Header, Content } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(false);
    setUsername(username);
    navigate('/home');
  };

  const handleLogout = () => {
    setIsAuthenticated(true);
    setUsername('');
    navigate('/login');
  };

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>

            <Menu.Item key="1">
              <Link to="/home">Home</Link>
            </Menu.Item>
            
            <Menu.Item key="2">
              <Link to="/user-list">User List</Link>
            </Menu.Item>
            
            <Menu.Item key="3">
              <Link to="/create-user">Create User</Link>
            </Menu.Item>
            
            {isAuthenticated ? (
              <>
                <Menu.Item key="5" onClick={handleLogout}>
                  Logout
                </Menu.Item>
                <Menu.Item key="4" disabled>
                  Welcome, {username}!
                </Menu.Item>
              </>
              ) : (
                <Menu.Item key="4">
                  <Link to="/login">Login</Link>
                </Menu.Item>
              )}

            </Menu>

        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/login" element={<LoginFormWithNavigation onLogin={handleLogin} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
