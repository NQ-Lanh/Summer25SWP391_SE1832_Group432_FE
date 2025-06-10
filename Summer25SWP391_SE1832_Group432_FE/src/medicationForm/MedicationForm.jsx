// MedicationForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Space, Pagination } from 'antd';
import './MedicationForm.css';
import api from '../config/axios';

const { Option } = Select;
const { TextArea } = Input;

const MedicationForm = () => {
  const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [medicinePages, setMedicinePages] = useState(['1']); // Track medicine pages
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSelect = (studentId) => {
    const selectedStudent = students.find(student => student.id === studentId);
    if (selectedStudent) {
      form.setFieldsValue({
        class: `Lớp ${selectedStudent.grade}${selectedStudent.class}`
      });
    }
  };

  const handleAddMedicinePage = () => {
    const newPageNumber = String(medicinePages.length + 1);
    setMedicinePages([...medicinePages, newPageNumber]);
    setCurrentPage(medicinePages.length + 1);
  };

  const handleRemoveMedicinePage = () => {
    if (medicinePages.length <= 1) return;
    
    const newPages = medicinePages.slice(0, -1);
    setMedicinePages(newPages);
    setCurrentPage(Math.min(currentPage, newPages.length));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="medication-form-container">
      <Form
        form={form}
        layout="vertical"
        className="medication-form"
      >
        <h2>Đơn gửi thuốc uống</h2>

        <div className="section">
          <h3>Thông tin học sinh</h3>
          <Form.Item 
            name="student" 
            label=" Chọn học sinh" 
            rules={[{ required: true, message: 'Vui lòng chọn học sinh' }]}
          > 
            <Select 
              showSearch 
              placeholder="Tìm và chọn học sinh"
              optionFilterProp="children"
              loading={loading}
              onChange={handleStudentSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {students.map(student => (
                <Option key={student.id} value={student.id}>
                  {student.name} - Lớp {student.grade}{student.class}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item 
            name="class" 
            label="Lớp"
          > 
            <Input disabled />
          </Form.Item>
        </div>

        <div className="section">
          <h3>Thông tin thuốc</h3>
          <div className="medicine-box">
            <div className="medicine-box-header">
              <h4>Trang {currentPage}</h4>
            </div>

            <Form.Item 
              name={['medicines', currentPage - 1, 'medicineName']} 
              label=" Tên thuốc" 
              rules={[{ required: true, message: 'vui lòng nhập thông tin' }]}
            > 
              <Input placeholder="Nhập tên thuốc" />
            </Form.Item>

            <Form.Item 
              name={['medicines', currentPage - 1, 'dosage']} 
              label=" Liều lượng" 
              rules={[{ required: true, message: 'vui lòng nhập thông tin' }]}
            > 
              <Input placeholder="VD: 1 viên/1 lần uống" />
            </Form.Item>

            <Form.Item 
              name={['medicines', currentPage - 1, 'time']} 
              label=" Thời điểm uống" 
              rules={[{ required: true, message: 'vui lòng nhập thông tin' }]}
            > 
              <Select 
                mode="multiple"
                placeholder="Chọn thời điểm uống thuốc"
                allowClear
              >
                <Option value="morning">Sáng</Option>
                <Option value="noon">Trưa</Option>
                <Option value="evening">Tối</Option>
              </Select>
            </Form.Item>

            <Form.Item 
              name={['medicines', currentPage - 1, 'note']} 
              label="Ghi chú"
            > 
              <TextArea rows={2} placeholder="Nhập các lưu ý đặc biệt (nếu có)" />
            </Form.Item>
          </div>

          <div className="medicine-footer">
            <Pagination 
              current={currentPage}
              total={medicinePages.length * 10}
              pageSize={10}
              onChange={handlePageChange}
              className="medicine-pagination"
              showSizeChanger={false}
            />
            <Space className="medicine-actions">
              <Button onClick={handleRemoveMedicinePage} disabled={medicinePages.length <= 1}>
                Xóa trang
              </Button>
              <Button type="primary" onClick={handleAddMedicinePage}>
                Thêm trang
              </Button>
            </Space>
          </div>
        </div>

        <Form.Item name="phone" label=" Số điện thoại phụ huynh" rules={[{ required: true }]}> 
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <div className="buttons">
          <Space>
            <Button type="default" onClick={() => form.resetFields()}>Nhập lại</Button>
            <Button type="primary" htmlType="submit">Xác nhận</Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default MedicationForm;
