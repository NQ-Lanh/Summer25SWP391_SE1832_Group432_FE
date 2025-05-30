import { useState } from "react";
import { Form, Input, Button, Checkbox, Select, Divider, message } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from "react-icons/fa";
import "./LoginPage.css";
import axios from "axios";

const { Option } = Select;

const LoginPage = () => {
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
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200"
          alt="Healthcare"
          className="login-image"
        />
        <div className="image-overlay"></div>
      </div>

      <div className="login-form-section">
        <div className="language-select">
          <Select
            value={language}
            onChange={setLanguage}
            style={{ width: 120 }}
          >
            <Option value="English">English</Option>
            <Option value="Spanish">Español</Option>
            <Option value="French">Français</Option>
          </Select>
        </div>

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
                {
                  min: 4,
                  message: "Username must be at least 6 characters",
                },
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
              <Button
                block
                icon={<FaMicrosoft />}
                className="btn secondary"
                style={{ marginTop: "8px" }}
              >
                Microsoft
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
