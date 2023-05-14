import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CreateUser from './Component/CreateUser';
import LoginForm from './Component/LoginForm';
import UserList from './Component/UserList';
import HomePage from './Component/HomePage';
import UpdateUser from './Component/UpdateUser';
import UserDetail from './Component/UserDetail';
import { Button } from 'antd';

const { Header, Content } = Layout;

const storage = {
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  }
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(storage.get('isLoggedIn') ?? false);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    storage.set('isLoggedIn', false);
    navigate('/');
  };

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{position: 'relative'}}>
            {isLoggedIn && (
              <>
                <Menu.Item key={'1'} style={{display: 'inline-block'}}>
                  <Link to={'/home'}>{'Home'}</Link>
                </Menu.Item>
                
                <>
                  <div style={{ position: 'absolute', right: 0 }}>
                    <Button
                      type="primary"
                      danger
                      ghost
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              </>
            )}
            {
              isLoggedIn && (
                <>
                <Menu.Item key={'2'} style={{display: 'inline-block'}}>
                  <Link to={'/user-list'}>{'UserList'}</Link>
                </Menu.Item>
                <Menu.Item key={'3'} style={{display: 'inline-block'}}>
                  <Link to={'/create-user'}>{'CreateUser'}</Link>
                </Menu.Item>
                </>
              )
            }
          </Menu>
        </Header>
        <Content style={{ minHeight: 'calc(100vh - 100px)' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/create-user" element={<CreateUser />} />
              {!isLoggedIn && <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />}
              {isLoggedIn && (
                <>
                  <Route path="/update-user/:id" element={<UpdateUser />} />
                  <Route path="/user-detail/:id" element={<UserDetail />} />
                </>
              )}
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
