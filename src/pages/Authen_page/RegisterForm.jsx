import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import React from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "./AuthenForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import AuthenForm from "./AuthenForm";

function RegisterPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("Form submitted:", values);
    try {
      const { dateOfBirth, ...rest } = values;
      const payload = {
        ...rest,
        dateOfBirth: dateOfBirth.toISOString(),
      };
      console.log("Payload gửi lên backend:", payload);
      const response = await api.post("Auth/register", payload);
      if (response && response.data && response.data.user) {
        dispatch(login(response.data.user)); // Lưu vào Redux
      }
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Đăng ký thất bại!");
    }
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
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên" },
            { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự" },
          ]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Vui lòng nhập tên đăng nhập" },
            { min: 4, message: "Tên đăng nhập phải có ít nhất 4 ký tự" },
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
              message: "Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ cái hoa và một ký tự đặc biệt"
            }
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^\d{10,15}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          rules={[
            { required: true, message: "Vui lòng chọn ngày sinh" },
            () => ({
              validator(_, value) {
                if (!value) return Promise.resolve();
                const year = value.year();
                if (year >= 1960 && year <= 2006) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Năm sinh nằm ngoài tuổi quy định, vui lòng đăng ký lại."));
              },
            })
          ]}
        >
          <DatePicker
            placeholder="Ngày sinh"
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input.TextArea placeholder="Địa chỉ" rows={2} />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Select.Option value="M">Nam</Select.Option>
            <Select.Option value="F">Nữ</Select.Option>
            <Select.Option value="O">Khác</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </AuthenForm>
  );
}

export default RegisterPage;
