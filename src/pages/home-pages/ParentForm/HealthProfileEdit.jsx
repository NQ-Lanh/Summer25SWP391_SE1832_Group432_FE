import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/dateFormatter";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const { Title } = Typography;
const { Option } = Select;

const HealthProfileEdit = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profile, setProfile] = useState();
  const [isEdit, setIsEdit] = useState(false);

  // Lấy ID người dùng từ Redux store
  const user = useSelector((state) => state.user);
  const userId = user?.userID;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        // Lấy thông tin phụ huynh trước
        const parentResponse = await api.get(`/Parent/user/${userId}`);
        const parentID = parentResponse.data.parentID;

        // Sau đó lấy danh sách học sinh theo parentID
        const studentsResponse = await api.get(`/Student/${parentID}`);

        // Lấy danh sách học sinh chưa được tạo profile
        // const studentsResponse = await api.get(
        //   `/HealthProfile/students-without-profile?parentId=${parentID}`
        // );

        // Xử lý response với cấu trúc mới có $values
        if (studentsResponse.status === 200) {
          const studentsData =
            studentsResponse.data.$values || studentsResponse.data;
          setStudents(studentsData);
          setSelectedStudent(studentsData[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải danh sách học sinh:", error);
        message.error("Không thể tải danh sách học sinh");
        setLoading(false);
      }
    };

    if (userId) {
      fetchStudents();
    }
  }, [userId]);

  useEffect(() => {
    form.setFieldsValue({
      fullName: selectedStudent?.fullName,
      className: selectedStudent?.className,
      dob: selectedStudent?.dateOfBirth
        ? moment(selectedStudent?.dateOfBirth)
        : null,
    });

    if (selectedStudent) {
      const fetchProfileBySelectedStudent = async () => {
        try {
          const res = await api.get(
            `/HealthProfile/search/${selectedStudent.studentID}`
          );
          if (res.status === 200) {
            if (res.data.$values.length === 0) {
              form.setFieldsValue({
                chronicDisease: "",
                visionTest: "",
                allergy: "",
                weight: "",
                height: "",
                lastCheckupDate: null,
              });
              setProfile(null);
            }
            const profile = res.data.$values[0];
            form.setFieldsValue({
              chronicDisease: profile.chronicDisease || "",
              visionTest: profile.visionTest,
              allergy: profile.allergy,
              weight: profile.weight,
              height: profile.height,
              lastCheckupDate:
                profile.lastCheckupDate && dayjs(profile.lastCheckupDate),
            });
            setProfile(profile);
          }
        } catch {
          setError("Không thể tải hồ sơ sức khỏe!");
        } finally {
          setLoading(false);
        }
      };

      fetchProfileBySelectedStudent();
    }
  }, [selectedStudent]);

  const onFinish = async (values) => {
    if (!selectedStudent) {
      message.error("Vui lòng chọn học sinh");
      return;
    }

    setSubmitting(true);

    try {
      const data = {
        studentID: selectedStudent.studentID,
        fullName: selectedStudent.fullName,
        className: selectedStudent.className,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
        chronicDisease: values.chronicDisease || "",
        visionTest: values.visionTest,
        allergy: values.allergy,
        weight: values.weight,
        height: values.height,
        lastCheckupDate: values.lastCheckupDate
          ? values.lastCheckupDate.format("YYYY-MM-DD")
          : new Date().toISOString().split("T")[0],
      };

      console.log("Health profile data:", data);
      const res = await api.put(`/HealthProfile/${profile.profileID}`, data);

      toast.success("Lưu hồ sơ thành công! Mã hồ sơ: " + profile.profileID);
    } catch (error) {
      console.error("Lỗi tạo hồ sơ sức khỏe:", error);
      message.error(
        error.response?.data?.message || "Tạo hồ sơ thất bại! Vui lòng thử lại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  console.log("student: ", selectedStudent);
  console.log("profile: ", profile);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "40px auto",
          boxShadow: "0 4px 24px 0 rgba(33,150,243,0.10)",
          minHeight: "400px",
        }}
      >
        <Button
          type="primary"
          shape="round"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/home")}
          style={{
            position: "absolute",
            left: 24,
            top: 24,
            background: "#f0f5ff",
            color: "#1677ff",
            border: "none",
            boxShadow: "0 2px 8px #1677ff22",
            fontWeight: 600,
            fontSize: 16,
            zIndex: 10,
            transition: "all 0.2s",
          }}
        >
          Quay lại trang chủ
        </Button>
        <Title level={3} style={{ textAlign: "center" }}>
          Hồ sơ sức khỏe học sinh của {selectedStudent?.fullName}
        </Title>
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Select
            value={selectedStudent?.studentID}
            placeholder="Chọn học sinh"
            loading={loading}
            onChange={(value) => {
              const student = students.find((s) => s.studentID === value);
              if (student) {
                setSelectedStudent(student);
              }
            }}
            style={{ width: "30%" }}
          >
            {students.map((student) => (
              <Option key={student.studentID} value={student.studentID}>
                {student.fullName}
              </Option>
            ))}
          </Select>
          <button
            style={{
              height: "100%",
              cursor: "pointer",
              backgroundColor: "rgb(22, 119, 255)",
              color: "white",
              padding: "4px 10px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
        </div>
        {profile ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ marginTop: 24 }}
          >
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 320 }}>
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên học sinh" },
                  ]}
                >
                  <Input
                    disabled
                    placeholder="Tên học sinh"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item label="Lớp">
                  <Input
                    name="className"
                    value={selectedStudent?.className || ""}
                    disabled
                    placeholder="Chưa có thông tin"
                  />
                </Form.Item>

                <Form.Item name="dob" label="Ngày tháng năm sinh">
                  <DatePicker
                    format="DD/MM/YYYY"
                    disabled
                    style={{ width: "100%" }}
                    placeholder="Chưa có thông tin"
                  />
                </Form.Item>

                <Form.Item
                  label="Dị ứng"
                  name="allergy"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập dị ứng (nếu có)",
                    },
                  ]}
                >
                  <Input
                    disabled={!isEdit}
                    placeholder="Nhập dị ứng (nếu có)"
                  />
                </Form.Item>
              </div>

              <div style={{ flex: 1, minWidth: 320 }}>
                <Form.List name="treatmentHistory">
                  {(fields, { add, remove }) => (
                    <div>
                      <label>Tiền sử điều trị</label>
                      {fields.map((field, idx) => (
                        <Space
                          key={field.key}
                          align="baseline"
                          style={{ display: "flex", marginBottom: 8 }}
                        >
                          <Form.Item
                            name={[field.name, "date"]}
                            fieldKey={[field.fieldKey, "date"]}
                            rules={[{ required: true, message: "Chọn ngày" }]}
                            style={{ marginBottom: 0 }}
                          >
                            <DatePicker
                              disabled={!isEdit}
                              format="DD/MM/YYYY"
                              placeholder="Ngày"
                              style={{ width: 120 }}
                            />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "desc"]}
                            fieldKey={[field.fieldKey, "desc"]}
                            rules={[
                              {
                                required: true,
                                message: "Nhập nội dung điều trị",
                              },
                            ]}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              disabled={!isEdit}
                              placeholder={`Tiền sử điều trị ${idx + 1}`}
                              style={{ width: 220 }}
                            />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                              style={{ color: "#ff4d4f", cursor: "pointer" }}
                            />
                          )}
                        </Space>
                      ))}
                      <Button
                        disabled={!isEdit}
                        type="dashed"
                        onClick={() => add()}
                        icon={<PlusOutlined />}
                        style={{ width: "100%" }}
                      >
                        Thêm tiền sử điều trị
                      </Button>
                    </div>
                  )}
                </Form.List>

                <Form.Item
                  label="Thị lực"
                  name="visionTest"
                  rules={[{ required: true, message: "Vui lòng nhập thị lực" }]}
                >
                  <Input disabled={!isEdit} placeholder="Nhập thị lực" />
                </Form.Item>

                <Form.Item
                  label="Ngày khám gần nhất"
                  name="lastCheckupDate"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngày khám" },
                  ]}
                >
                  <DatePicker
                    disabled={!isEdit}
                    format="YYYY-MM-DD"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Chiều cao"
                  name="height"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin chiều cao",
                    },
                  ]}
                >
                  <Input
                    disabled={!isEdit}
                    placeholder="Nhập thông tin chiều cao (cm)"
                  />
                </Form.Item>

                <Form.Item
                  label="Cân nặng"
                  name="weight"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin cân nặng",
                    },
                  ]}
                >
                  <Input
                    disabled={!isEdit}
                    placeholder="Nhập thông tin cân nặng (kg)"
                  />
                </Form.Item>

                <Form.Item
                  label="Bệnh Mãn Tính"
                  name="chronicDisease"
                  rules={[
                    {
                      required: false,
                      message: "Nhập thông tin bệnh mãn tính (nếu có)",
                    },
                  ]}
                >
                  <Input.TextArea
                    disabled={!isEdit}
                    rows={3}
                    placeholder="Nhập thông tin bệnh mãn tính (nếu không có, để trống)"
                  />
                </Form.Item>
              </div>
            </div>

            {isEdit && (
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  variant="solid"
                  color="yellow"
                  style={{
                    minWidth: 180,
                    fontWeight: 600,
                    fontSize: 16,
                    marginRight: "10px",
                  }}
                  onClick={() => setIsEdit(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{ minWidth: 180, fontWeight: 600, fontSize: 16 }}
                >
                  {submitting ? "Đang lưu..." : "Lưu hồ sơ"}
                </Button>
              </Form.Item>
            )}
          </Form>
        ) : (
          <div
            style={{
              width: "100%",
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p>
              Chưa tạo hồ sơ sức khỏe.{" "}
              <span
                onClick={() => navigate("/create-health-profile")}
                style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
              >
                Tạo hồ sơ sức khỏe
              </span>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HealthProfileEdit;
