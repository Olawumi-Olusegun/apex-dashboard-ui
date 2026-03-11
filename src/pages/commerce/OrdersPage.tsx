import { useState } from 'react';
import { Button, Input, Modal, Form, Select, message, DatePicker, InputNumber } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { RecentOrders } from '../../components/dashboard/RecentOrders';

interface OrderFormData {
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  unitPrice: number;
  priority: 'high' | 'medium' | 'low';
  deliveryDate: string;
  notes?: string;
}

export const OrdersPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleCreateOrder = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values: OrderFormData) => {
        console.log('Creating order:', values);
        message.success('Order created successfully!');
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const products = [
    'Wireless Headphones',
    'Smart Watch', 
    'Bluetooth Speaker',
    'Phone Case',
    'Tablet',
    'Pro Dashboard License',
    'Team Plan Upgrade',
    'Enterprise License',
    'Single License',
    'Basic Plan',
    'Premium Support',
    'Custom Integration',
    'API Access Plan',
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Orders</h1>
            <p className="text-slate-500">Manage all customer orders and transactions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Search */}
            <Input
              placeholder="Search orders..."
              prefix={<SearchOutlined className="text-slate-400" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-64"
            />
            
            {/* Create Order Button */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateOrder}
              className="bg-slate-900 hover:bg-slate-800 border-slate-900"
            >
              Create Order
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <RecentOrders showActions={true} pageSize={10} />

      {/* Create Order Modal */}
      <Modal
        title="Create New Order"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        okText="Create Order"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
        >
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

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="product"
              label="Product"
              rules={[{ required: true, message: 'Please select a product' }]}
            >
              <Select placeholder="Select product">
                {products.map((product) => (
                  <Select.Option key={product} value={product}>
                    {product}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: 'Please enter quantity' }]}
            >
              <InputNumber 
                min={1} 
                max={100} 
                placeholder="1"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="unitPrice"
              label="Unit Price ($)"
              rules={[{ required: true, message: 'Please enter unit price' }]}
            >
              <InputNumber 
                min={0} 
                precision={2}
                placeholder="0.00"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select priority' }]}
            >
              <Select placeholder="Select priority">
                <Select.Option value="high">High</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="low">Low</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="deliveryDate"
            label="Expected Delivery Date"
            rules={[{ required: true, message: 'Please select delivery date' }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              placeholder="Select delivery date"
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Order Notes"
          >
            <Input.TextArea 
              rows={3}
              placeholder="Add any special notes for this order..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};