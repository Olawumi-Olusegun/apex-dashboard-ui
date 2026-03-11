import { useState } from 'react';
import { Table, Tag, Button, Space, Modal, message, Form, Input, Select, DatePicker, InputNumber, Descriptions } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface OrderData {
  key: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  orderNumber: string;
  product: string;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  amount: number;
  orderDate: string;
}

// Generate more sample data for pagination demonstration
const generateOrderData = (): OrderData[] => {
  const customers = [
    { name: 'Emma Wilson', email: 'emma@example.com', avatar: 'EW' },
    { name: 'James Chen', email: 'james@company.io', avatar: 'JC' },
    { name: 'Sofia Garcia', email: 'sofia@startup.co', avatar: 'SG' },
    { name: 'Alex Thompson', email: 'alex@dev.com', avatar: 'AT' },
    { name: 'Maria Santos', email: 'maria@agency.co', avatar: 'MS' },
    { name: 'David Kim', email: 'david@tech.io', avatar: 'DK' },
    { name: 'Sarah Johnson', email: 'sarah@design.co', avatar: 'SJ' },
    { name: 'Michael Brown', email: 'michael@startup.com', avatar: 'MB' },
    { name: 'Lisa Zhang', email: 'lisa@consulting.net', avatar: 'LZ' },
    { name: 'Robert Taylor', email: 'robert@enterprise.org', avatar: 'RT' },
  ];

  const products = [
    'Pro Dashboard License',
    'Team Plan Upgrade',
    'Enterprise License',
    'Single License',
    'Basic Plan',
    'Premium Support',
    'Custom Integration',
    'API Access Plan',
  ];

  const statuses: ('Completed' | 'Processing' | 'Pending' | 'Cancelled')[] = [
    'Completed', 'Processing', 'Pending', 'Cancelled'
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const customer = customers[index % customers.length];
    const orderNum = 7850 + index;
    return {
      key: `${index + 1}`,
      customer,
      orderNumber: `ORD-${orderNum}`,
      product: products[index % products.length],
      status: statuses[index % statuses.length],
      amount: Math.floor(Math.random() * 1500) + 50,
      orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    };
  });
};

const data: OrderData[] = generateOrderData();

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'Processing':
      return 'blue';
    case 'Pending':
      return 'orange';
    case 'Cancelled':
      return 'red';
    default:
      return 'default';
  }
};

interface RecentOrdersProps {
  showActions?: boolean;
  pageSize?: number;
}

export const RecentOrders = ({ showActions = false, pageSize = 6 }: RecentOrdersProps) => {
  const [orders, setOrders] = useState<OrderData[]>(data);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [editForm] = Form.useForm();

  const handleView = (record: OrderData) => {
    setSelectedOrder(record);
    setIsViewModalOpen(true);
  };

  const handleEdit = (record: OrderData) => {
    setSelectedOrder(record);
    editForm.setFieldsValue({
      customerName: record.customer.name,
      customerEmail: record.customer.email,
      product: record.product,
      status: record.status,
      amount: record.amount,
      orderDate: dayjs(record.orderDate)
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: OrderData) => {
    Modal.confirm({
      title: 'Delete Order',
      content: `Are you sure you want to delete order ${record.orderNumber}?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setOrders(prevOrders => prevOrders.filter(order => order.key !== record.key));
        message.success(`Order ${record.orderNumber} deleted successfully`);
      },
    });
  };

  const handleEditSave = () => {
    editForm
      .validateFields()
      .then((values) => {
        if (selectedOrder) {
          const updatedOrder = {
            ...selectedOrder,
            customer: {
              ...selectedOrder.customer,
              name: values.customerName,
              email: values.customerEmail,
            },
            product: values.product,
            status: values.status,
            amount: values.amount,
            orderDate: values.orderDate.format('MM/DD/YYYY'),
          };

          setOrders(prevOrders => 
            prevOrders.map(order => 
              order.key === selectedOrder.key ? updatedOrder : order
            )
          );

          message.success(`Order ${selectedOrder.orderNumber} updated successfully`);
          setIsEditModalOpen(false);
          setSelectedOrder(null);
          editForm.resetFields();
        }
      })
      .catch((error) => {
        console.log('Validation failed:', error);
      });
  };

  const columns: ColumnsType<OrderData> = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600">
            {customer.avatar}
          </div>
          <div className="min-w-0">
            <div className="font-medium text-slate-900 text-sm">{customer.name}</div>
            <div className="text-xs text-slate-500 truncate">{customer.email}</div>
          </div>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Order',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (orderNumber) => (
        <span className="text-sm font-mono text-slate-600">{orderNumber}</span>
      ),
      width: '15%',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (product) => (
        <span className="text-sm text-slate-900">{product}</span>
      ),
      width: '20%',
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date) => (
        <span className="text-sm text-slate-600">{date}</span>
      ),
      width: '12%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} className="text-xs font-medium border-0">
          {status}
        </Tag>
      ),
      width: '12%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => (
        <span className="font-semibold text-slate-900">${amount.toFixed(2)}</span>
      ),
      width: '12%',
    },
  ];

  // Add actions column if showActions is true
  if (showActions) {
    columns.push({
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
            onClick={() => handleView(record)}
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
    });
  }

  const paginationConfig: TablePaginationConfig = {
    pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
    pageSizeOptions: ['6', '10', '20', '50'],
    className: 'mt-4',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Recent Orders</h2>
          <p className="text-sm text-slate-500">Latest transactions from your store</p>
        </div>
        <button className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors">
          View all
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
        pagination={paginationConfig}
        size="small"
        className="ant-table-custom"
        scroll={{ x: 800 }}
      />

      {/* View Order Modal */}
      <Modal
        title={`Order Details - ${selectedOrder?.orderNumber}`}
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false);
          setSelectedOrder(null);
        }}
        footer={[
          <Button key="close" onClick={() => {
            setIsViewModalOpen(false);
            setSelectedOrder(null);
          }}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedOrder && (
          <Descriptions bordered column={2} className="mt-4">
            <Descriptions.Item label="Order Number" span={2}>
              <span className="font-mono">{selectedOrder.orderNumber}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Customer Name">
              {selectedOrder.customer.name}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Email">
              {selectedOrder.customer.email}
            </Descriptions.Item>
            <Descriptions.Item label="Product">
              {selectedOrder.product}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {selectedOrder.orderDate}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              <span className="font-semibold text-green-600">
                ${selectedOrder.amount.toFixed(2)}
              </span>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        title={`Edit Order - ${selectedOrder?.orderNumber}`}
        open={isEditModalOpen}
        onOk={handleEditSave}
        onCancel={() => {
          setIsEditModalOpen(false);
          setSelectedOrder(null);
          editForm.resetFields();
        }}
        width={600}
        okText="Save Changes"
      >
        <Form form={editForm} layout="vertical" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true, message: 'Please enter customer name' }]}
            >
              <Input placeholder="Enter customer name" />
            </Form.Item>

            <Form.Item
              name="customerEmail"
              label="Customer Email"
              rules={[
                { required: true, message: 'Please enter customer email' },
                { type: 'email', message: 'Please enter valid email' }
              ]}
            >
              <Input placeholder="Enter customer email" />
            </Form.Item>
          </div>

          <Form.Item
            name="product"
            label="Product"
            rules={[{ required: true, message: 'Please enter product' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select placeholder="Select status">
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Processing">Processing</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Cancelled">Cancelled</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount ($)"
              rules={[{ required: true, message: 'Please enter amount' }]}
            >
              <InputNumber
                min={0}
                precision={2}
                placeholder="0.00"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="orderDate"
            label="Order Date"
            rules={[{ required: true, message: 'Please select order date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};