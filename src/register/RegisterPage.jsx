import { Button, Checkbox, Divider, Form, Input, Select } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

function RegisterPage() {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("English");

  const onFinish = async (values) => {
    console.log("Form submitted:", values);
    await axios.post("https://localhost:7178/api/Auth/login");
    console.log("Login successful!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img
          src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Healthcare"
          className="login-image"
        />
        <div className="image-overlay"></div>
      </div>

      <div className="login-form-section">

        <div className="form-wrapper">
          <h2 className="title">School Health Portal Login</h2>
          <p className="subtitle">Welcome back! Please enter your details</p>

          <Form
  form={form}
  layout="vertical"
  name="loginForm"
  initialValues={{ rememberMe: false }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
>
  <Form.Item
    label="Username"
    name="email"
    rules={[
      { required: true, message: "Phone number is required" },
      { min: 4, message: "Username must be at least 6 characters" },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[
      { required: true, message: "Password is required" },
      { min: 6, message: "Password must be at least 6 characters" },
    ]}
  >
    <Input.Password
      iconRender={(visible) => (visible ? <FaEyeSlash /> : <FaEye />)}
      visibilityToggle={{
        visible: showPassword,
        onVisibleChange: setShowPassword,
      }}
    />
  </Form.Item>

  <Form.Item
    label="Confirm Password"
    name="confirmPassword"
    dependencies={['password']}
    rules={[
      { required: true, message: "Please confirm your password" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Passwords do not match"));
        },
      }),
    ]}
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    label="Phone Number"
    name="phone"
    rules={[
      { required: true, message: "Phone number is required" },
      { pattern: /^\d{10,15}$/, message: "Phone number is not valid" },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="Address"
    name="address"
    rules={[{ required: true, message: "Address is required" }]}
  >
    <Input.TextArea rows={2} />
  </Form.Item>

  <Form.Item
    label="Gender"
    name="gender"
    rules={[{ required: true, message: "Please select your gender" }]}
  >
    <Select placeholder="Select gender">
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
      <Select.Option value="other">Other</Select.Option>
    </Select>
  </Form.Item>

  <div className="form-options">
    <Form.Item name="rememberMe" valuePropName="checked" noStyle>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>
    <a href="#" className="forgot-password">
      Forgot your password?
    </a>
  </div>

  <Form.Item>
    <Button type="primary" htmlType="submit" block>
      Sign in
    </Button>
  </Form.Item>

  <Divider>Or continue with</Divider>

  <div className="oauth-buttons">
    <Button block icon={<FaGoogle />} className="btn secondary">
      Google
    </Button>
  </div>
</Form>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage