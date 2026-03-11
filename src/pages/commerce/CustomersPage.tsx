import { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, Select, Tag,  message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface CustomerData {
  key: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'VIP';
  joinDate: string;
  avatar: string;
}

const generateCustomerData = (): CustomerData[] => {
  const customers = [
    { name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 234 567 8900', location: 'New York, USA', avatar: 'EW' },
    { name: 'James Chen', email: 'james@company.io', phone: '+1 234 567 8901', location: 'San Francisco, USA', avatar: 'JC' },
    { name: 'Sofia Garcia', email: 'sofia@startup.co', phone: '+1 234 567 8902', location: 'Barcelona, Spain', avatar: 'SG' },
    { name: 'Alex Thompson', email: 'alex@dev.com', phone: '+1 234 567 8903', location: 'London, UK', avatar: 'AT' },
    { name: 'Maria Santos', email: 'maria@agency.co', phone: '+1 234 567 8904', location: 'São Paulo, Brazil', avatar: 'MS' },
    { name: 'David Kim', email: 'david@tech.io', phone: '+1 234 567 8905', location: 'Seoul, South Korea', avatar: 'DK' },
    { name: 'Sarah Johnson', email: 'sarah@design.co', phone: '+1 234 567 8906', location: 'Toronto, Canada', avatar: 'SJ' },
    { name: 'Michael Brown', email: 'michael@startup.com', phone: '+1 234 567 8907', location: 'Sydney, Australia', avatar: 'MB' },
    { name: 'Lisa Zhang', email: 'lisa@consulting.net', phone: '+1 234 567 8908', location: 'Singapore', avatar: 'LZ' },
    { name: 'Robert Taylor', email: 'robert@enterprise.org', phone: '+1 234 567 8909', location: 'Berlin, Germany', avatar: 'RT' },
  ];

  const statuses: ('Active' | 'Inactive' | 'VIP')[] = ['Active', 'Inactive', 'VIP'];

  return customers.map((customer, index) => ({
    key: `${index + 1}`,
    ...customer,
    totalOrders: Math.floor(Math.random() * 20) + 1,
    totalSpent: Math.floor(Math.random() * 5000) + 100,
    status: statuses[index % 3],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));
};

export const CustomersPage = () => {
  const [data] = useState<CustomerData[]>(generateCustomerData());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerData | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleCreate = () => {
    setEditingCustomer(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: CustomerData) => {
    setEditingCustomer(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record: CustomerData) => {
    Modal.confirm({
      title: 'Delete Customer',
      content: `Are you sure you want to delete "${record.name}"?`,
      okType: 'danger',
      onOk() {
        message.success(`Customer "${record.name}" deleted successfully!`);
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        if (editingCustomer) {
          message.success('Customer updated successfully!');
        } else {
          message.success('Customer created successfully!');
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingCustomer(null);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingCustomer(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'red';
      case 'VIP':
        return 'gold';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<CustomerData> = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-sm font-medium text-slate-600">
            {record.avatar}
          </div>
          <div>
            <div className="font-medium text-slate-900">{name}</div>
            <div className="text-sm text-slate-500">{record.email}</div>
          </div>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Contact',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone, record) => (
        <div>
          <div className="text-sm text-slate-900">{phone}</div>
          <div className="text-sm text-slate-500">{record.location}</div>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (orders) => <span className="font-medium text-slate-900">{orders}</span>,
      sorter: (a, b) => a.totalOrders - b.totalOrders,
      width: '10%',
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (spent) => <span className="font-semibold text-slate-900">${spent.toLocaleString()}</span>,
      sorter: (a, b) => a.totalSpent - b.totalSpent,
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} className="font-medium border-0">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'VIP', value: 'VIP' },
      ],
      onFilter: (value: any, record) => record.status === value,
      width: '10%',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => <span className="text-sm text-slate-600">{date}</span>,
      width: '12%',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      width: '15%',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            className="text-blue-600 hover:text-blue-800"
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
            className="text-green-600 hover:text-green-800"
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
            className="text-red-600 hover:text-red-800"
            danger
          />
        </Space>
      ),
    },
  ];

  const paginationConfig: TablePaginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`,
    pageSizeOptions: ['10', '20', '50'],
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase()) ||
    item.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Customers</h1>
            <p className="text-slate-500">Manage customer relationships and information</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search customers..."
              prefix={<SearchOutlined className="text-slate-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
              className="bg-slate-900 hover:bg-slate-800 border-slate-900"
            >
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={paginationConfig}
          className="ant-table-custom"
          scroll={{ x: 1000 }}
        />
      </div>

      {/* Create/Edit Customer Modal */}
      <Modal
        title={editingCustomer ? 'Edit Customer' : 'Create New Customer'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText={editingCustomer ? 'Update Customer' : 'Create Customer'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="customer_form"
          className="mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please input customer name!' }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status!' }]}
              initialValue="Active"
            >
              <Select>
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
                <Select.Option value="VIP">VIP</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please input location!' }]}
          >
            <Input placeholder="City, Country" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};