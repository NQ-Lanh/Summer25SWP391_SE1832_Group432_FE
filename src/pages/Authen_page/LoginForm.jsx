import React from "react";
import { Form, Input, Button, Checkbox, Select, Divider } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaMicrosoft } from "react-icons/fa";
import "./AuthenForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../config/axios";
import { login } from "../../redux/features/userSlice";
import AuthenForm from "./AuthenForm";

const { Option } = Select;

const LoginPage = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    console.log("Form submitted:", values);
    try {
      const response = await api.post("Auth/login", values);
      // Lưu toàn bộ thông tin user vào Redux
      const userData = {
        ...response.data.user,
        fullName: response.data.user.fullName,
        username: response.data.user.username,
        phone: response.data.user.phone,
        dateOfBirth: response.data.user.dateOfBirth,
        gender: response.data.user.gender,
        address: response.data.user.address,
        role: response.data.user.role,
      };
      dispatch(login(userData));
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;
      if (user.role === "admin") {
        navigate("/dashboard");
        toast.success("Đăng nhập thành công!");
        return;
      }

      navigate("/home");
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      toast.error(error.response.data.message);
    }

    console.log("Login successful!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <AuthenForm subtitle="Chào mừng bạn đến với phần mềm quản lí y tế học đường">
      <Form
        form={form}
        layout="vertical"
        name="loginForm"
        initialValues={{ rememberMe: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập" },
            {
              min: 6,
              message: "Tên đăng nhập phải có ít nhất 6 ký tự",
            },
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
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
            onClick={() => navigate("/register")}
          >
            Đăng ký tài khoản
          </Button>
        </div>
      </Form>
    </AuthenForm>
  );
};

export default LoginPage;
