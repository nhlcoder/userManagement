import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/User/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUser(null); // set user to null to indicate an error occurred
        setLoading(false);
      });
  }, [id]);

  const onFinish = (values) => {
    const updatedUser = {
      ...user,
      ...values,
      PassWord: values.PassWord || user.PassWord, // include password in update only if it's not empty
      Address: {
        ...user.Address,
        ...values.Address,
      },
    };
    axios.put(`http://localhost:3000/User/${id}`, updatedUser)
      .then(() => {
        alert('User updated successfully');
        navigate('/user-list');
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating user');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (user === undefined) {
    return <div>User not found.</div>;
  } else if (user === null) {
    return <div>Error loading user.</div>;
  } else {
    return (
      <div>
        <h1>Update User</h1>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          initialValues={{
            UserName: user.UserName,
            PassWord: user.PassWord,
            Email: user.Email,
            FirstName: user.FirstName,
            SurName: user.SurName,
            Address: user.Address,
            DateOfBir: user.DateOfBir,
            IntroduceYourself: user.IntroduceYourself,
          }}
        >
          <Form.Item
            label="UserName"
            name="UserName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input disabled />
          </Form.Item>
          
          <Form.Item
            label="PassWord"
            name="PassWord"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="First Name"
            name="FirstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="SurName"
            rules={[{ required: true, message: 'Please input your surname!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name={['Address', 'FullName']}
            rules={[{ required: true, message: 'Please input your address name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address No"
            name={['Address', 'AddressNo']}
            rules={[{ required: true, message: 'Please input your address number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ward Name"
            name={['Address', 'WardName']}
            rules={[{ required: true, message: 'Please input your ward name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="District Name"
            name={['Address', 'DistrictName']}
            rules={[{ required: true, message: 'Please input your district name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Province Name"
            name={['Address', 'ProvinceName']}
            rules={[{ required: true, message: 'Please input your province name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="DateOfBir"
            rules={[{ required: true, message: 'Please input your date of birth!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Introduce Yourself"
            name="IntroduceYourself"
            rules={[{ required: true, message: 'Please introduce yourself!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
};

export default UpdateUser;
