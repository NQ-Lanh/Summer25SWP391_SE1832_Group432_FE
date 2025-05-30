import { use, useState } from "react";
import { Form, Input, Button, Checkbox, Select, Divider, message } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from "react-icons/fa";
import "./LoginPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    console.log("Form submitted:", values);
    try {
      const respsonse = await axios.post(
        "http://localhost:5092/api/Auth/login",
        values
      );
      toast.success(respsonse?.data?.message);
      nav("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

    console.log("Login successful!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img
          src="images/hinh-anh-mam-non_23202317.jpg "
          alt="Healthcare"
          className="login-image"
        />
        <div className="image-overlay"></div>
      </div>

      <div className="login-form-section">
        <div className="form-wrapper">
          <img
            src="images/Screenshot_2025-05-27_080730-removebg-preview.png"
            alt=""
          />
          <p className="subtitle welcome-text">
            Chào mừng bạn đến với phần mềm quản lí y tế học đường
          </p>

          <Form
            form={form}
            layout="vertical"
            Add
            commentMore
            actions
            name="loginForm"
            initialValues={{ rememberMe: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  min: 4,
                  message: "Mật khẩu tối thiểu phải 6 kí tự",
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
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>

            <div className="oauth-buttons">
              <Button
                block
                className="btn secondary"
                onClick={() => nav("/register")}
              >
                Đăng ký tài khoản
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
