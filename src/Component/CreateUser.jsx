import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import moment from "moment";

const { TextArea } = Input;

const CreateUser = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const newUser = {
      Email: values.Email,
      PassWord: values.PassWord,
      UserName: values.UserName,
      FirstName: values.FirstName,
      SurName: values.SurName,
      FullName: values.FullName,
      Address: {
        ProvinceName: values.ProvinceName,
        DistrictName: values.DistrictName,
        WardName: values.WardName,
        AddressNo: values.AddressNo,
        FullName: values.AddressFullName
      },
      DateOfBir: values.DateOfBir ? moment(values.DateOfBir, 'YYYY-MM-DD') : null,
      IntroduceYourself: values.IntroduceYourself
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
          label="Email"
          name="Email"
          rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}
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
          label="UserName"
          name="UserName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>



        <Form.Item
          label="FirstName"
          name="FirstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="SurName"
          name="SurName"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="FullName"
          name="FullName"
          rules={[{ required: true, message: "Please input your full name!" }]}
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
          label="District Name"
          name="DistrictName"
          rules={[{ required: true, message: "Please input your district name!" }]}
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
          label="Address No"
          name="AddressNo"
          rules={[{ required: true, message: "Please input your address no!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="AddressFullName"
          name="AddressFullName"
          rules={[{ required: true, message: "Please input your address no!" }]}
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
