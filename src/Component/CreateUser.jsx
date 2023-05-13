import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

const { TextArea } = Input;

const CreateUser = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const onFinish = (values) => {
    const newUser = {
      ...user,
      ...values,
      Address: {
        FullName: values.FullName,
        AddressNo: values.AddressNo,
        WardName: values.WardName,
        DistrictName: values.DistrictName,
        ProvinceName: values.ProvinceName,
      },
      // Password: values.PassWord // Thêm trường password vào user
    };
    axios
      .post("http://localhost:3000/User", newUser)
      .then(() => {
        alert("User created successfully");
        navigate("/user-list");
      })
      .catch((error) => {
        console.error(error);
        alert("Error creating user");
      });
  };

  return (
    <div>
      <h1>Create User</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          label="UserName"
          name="UserName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PassWord"
          name="PassWord"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="First Name"
          name="FirstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Surname"
          name="SurName"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address Name"
          name="FullName"
          rules={[{ required: true, message: "Please input your address name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address No"
          name="AddressNo"
          rules={[{ required: true, message: "Please input your address number!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ward Name"
          name="WardName"
          rules={[{ required: true, message: "Please input your ward name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="District Name"
          name="DistrictName"
          rules={[{ required: true, message: "Please input your district name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Province Name"
          name="ProvinceName"
          rules={[{ required: true, message: "Please input your province name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="DateOfBir"
          rules={[{ required: true, message: "Please input your date of birth!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Introduce Yourself"
          name="IntroduceYourself"
          rules={[{ required: true, message: "Please introduce yourself!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
