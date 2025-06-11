import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {
  EditOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Dữ liệu mẫu
const initialParentInfo = {
  avatar: "https://i.pravatar.cc/300?img=32", // Link ảnh avatar mẫu
  hoTenPhuHuynh: "Chưa đăng nhập",
  hoTenCon: "Nguyễn Văn B",
  ngaySinh: "01/01/2010",
  diaChi: "123 Đường ABC, Quận 1, TP.HCM",
  gioiTinh: "Nam",
  soDienThoai: "0901234567",
};

const { Title, Text } = Typography;
const { Option } = Select;

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user).user;
  const [parentInfo, setParentInfo] = useState({
    ...initialParentInfo,
    hoTenPhuHuynh: user ? user.fullName : "Chưa đăng nhập"
  });
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Xử lý mở modal chỉnh sửa
  const handleEdit = () => {
    form.setFieldsValue({
      diaChi: parentInfo.diaChi,
      soDienThoai: parentInfo.soDienThoai,
    });
    setOpen(true);
  };

  // Xử lý lưu thông tin
  const handleSave = () => {
    form.validateFields().then((values) => {
      setParentInfo((prev) => ({ ...prev, ...values }));
      setOpen(false);
      message.success("Cập nhật thông tin thành công!");
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #e3f0ff 0%, #f8fdff 100%)",
        padding: 0,
      }}
    >
      {/* Nút quay lại */}
      <Button
        icon={<ArrowLeftOutlined style={{ fontSize: 20, color: "#1976d2" }} />}
        style={{
          position: "absolute",
          top: 32,
          left: 56,
          zIndex: 10,
          fontWeight: 700,
          fontSize: 16,
          color: "#1976d2",
          background: "#fff",
          border: "1.5px solid #1976d2",
          boxShadow: "0 2px 8px #1976d244",
          padding: "4px 18px",
          borderRadius: 8,
          transition: "all 0.2s",
        }}
        onClick={() => navigate("/home")}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#e3f0ff";
          e.currentTarget.style.color = "#1565c0";
          e.currentTarget.style.borderColor = "#1565c0";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "#1976d2";
          e.currentTarget.style.borderColor = "#1976d2";
        }}
      >
        Quay lại
      </Button>
      {/* Banner giả lập */}
      <div
        style={{
          width: "100%",
          height: 180,
          background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
          position: "relative",
          marginBottom: 0,
        }}
      >
        <Title
          level={2}
          style={{
            color: "white",
            position: "absolute",
            left: "50%",
            bottom: 32,
            transform: "translateX(-50%)",
            textShadow: "0 2px 8px #2196f399",
          }}
        >
          Trang cá nhân phụ huynh
        </Title>
      </div>
      <Row justify="center" style={{ marginTop: -90 }}>
        <Col span={20}>
          <Card
            style={{
              borderRadius: 24,
              boxShadow: "0 8px 32px 0 #2196f322",
              minHeight: 380,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Row gutter={0}>
              {/* Avatar và tên phụ huynh */}
              <Col
                span={8}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(180deg, #e3f0ff 0%, #f8fdff 100%)",
                  borderTopLeftRadius: 24,
                  borderBottomLeftRadius: 24,
                  padding: "48px 0",
                }}
              >
                <Avatar
                  src={parentInfo.avatar}
                  size={160}
                  icon={<UserOutlined />}
                  style={{
                    border: "6px solid #fff",
                    boxShadow: "0 4px 24px #2196f344",
                    marginBottom: 24,
                  }}
                />
                <Title level={3} style={{ marginBottom: 0, color: "#1976d2" }}>
                  {parentInfo.hoTenPhuHuynh}
                </Title>
                <Text type="secondary">Phụ huynh</Text>
              </Col>
              {/* Thông tin cá nhân */}
              <Col
                span={16}
                style={{ padding: "48px 56px", position: "relative" }}
              >
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  size="large"
                  style={{
                    position: "absolute",
                    top: 32,
                    right: 56,
                    borderRadius: 8,
                    fontWeight: 600,
                    boxShadow: "0 2px 8px #2196f344",
                  }}
                  onClick={handleEdit}
                >
                  Chỉnh sửa thông tin cá nhân
                </Button>
                <Title
                  level={4}
                  style={{
                    color: "#1976d2",
                    marginBottom: 32,
                    fontWeight: 700,
                  }}
                >
                  Thông tin cá nhân
                </Title>
                <Row gutter={[32, 24]}>
                  <Col span={12}>
                    <Text strong>Họ và tên của con:</Text>
                    <br />
                    <Text>{parentInfo.hoTenCon}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Ngày sinh:</Text>
                    <br />
                    <Text>{parentInfo.ngaySinh}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Địa chỉ:</Text>
                    <br />
                    <Text>{parentInfo.diaChi}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Giới tính:</Text>
                    <br />
                    <Text>{parentInfo.gioiTinh}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Số điện thoại:</Text>
                    <br />
                    <Text>{parentInfo.soDienThoai}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* Modal chỉnh sửa thông tin cá nhân */}
      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            diaChi: parentInfo.diaChi,
            soDienThoai: parentInfo.soDienThoai,
          }}
        >
          <Form.Item
            label="Địa chỉ"
            name="diaChi"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="soDienThoai"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^0\d{9}$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
