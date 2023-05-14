import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const storage = {
  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  }
}

const LoginForm = ({ setIsLoggedIn }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const response = await axios.get('http://localhost:3000/User');
      const users = response.data;
      const user = users.find(
        (user) => user.Email === values.email && user.PassWord === values.password
      );
      const isAdmin = values.email === 'nguyenhaily@gmail.com' && values.password === 'nguyenhaily';
      if (user || isAdmin) {
        setIsLoggedIn(true);
        storage.set('isLoggedIn', true); // Lưu thông tin của user vào localStorage
        navigate('/home');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('Failed to fetch user data. Please try again later.');
    }
  
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 400 }}>
        {error && (
          <Alert
            message="Login Failed"
            description={error}
            type="error"
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 24 }}
          />
        )}
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h1>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
