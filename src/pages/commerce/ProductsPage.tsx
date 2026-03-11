import { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, InputNumber, Select, Tag, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface ProductData {
  key: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive' | 'Draft';
  image?: string;
  description: string;
}

const generateProductData = (): ProductData[] => {
  const products = [
    { name: 'Pro Dashboard License', category: 'Software', price: 299, stock: 50, status: 'Active' as const },
    { name: 'Team Plan Upgrade', category: 'Software', price: 599, stock: 30, status: 'Active' as const },
    { name: 'Enterprise License', category: 'Software', price: 1499, stock: 10, status: 'Active' as const },
    { name: 'Single License', category: 'Software', price: 79, stock: 100, status: 'Active' as const },
    { name: 'Basic Plan', category: 'Software', price: 49, stock: 75, status: 'Active' as const },
    { name: 'Premium Support', category: 'Service', price: 199, stock: 25, status: 'Active' as const },
    { name: 'Custom Integration', category: 'Service', price: 999, stock: 5, status: 'Inactive' as const },
    { name: 'API Access Plan', category: 'Service', price: 149, stock: 40, status: 'Draft' as const },
  ];

  return products.map((product, index) => ({
    key: `${index + 1}`,
    ...product,
    description: `High-quality ${product.name.toLowerCase()} for modern businesses`,
  }));
};

export const ProductsPage = () => {
  const [data] = useState<ProductData[]>(generateProductData());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: ProductData) => {
    setEditingProduct(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record: ProductData) => {
    Modal.confirm({
      title: 'Delete Product',
      content: `Are you sure you want to delete "${record.name}"?`,
      okType: 'danger',
      onOk() {
        message.success(`Product "${record.name}" deleted successfully!`);
      },
    });
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(() => {
        if (editingProduct) {
          message.success('Product updated successfully!');
        } else {
          message.success('Product created successfully!');
        }
        setIsModalVisible(false);
        form.resetFields();
        setEditingProduct(null);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingProduct(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'red';
      case 'Draft':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns: ColumnsType<ProductData> = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium text-slate-600">{name.substring(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <div className="font-medium text-slate-900">{name}</div>
            <div className="text-sm text-slate-500">{record.category}</div>
          </div>
        </div>
      ),
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className="font-semibold text-slate-900">${price}</span>,
      sorter: (a, b) => a.price - b.price,
      width: '15%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <span className={`font-medium ${stock < 20 ? 'text-red-600' : 'text-slate-900'}`}>
          {stock}
        </span>
      ),
      sorter: (a, b) => a.stock - b.stock,
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
        { text: 'Draft', value: 'Draft' },
      ],
      onFilter: (value: any, record) => record.status === value,
      width: '15%',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      width: '20%',
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
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`,
    pageSizeOptions: ['10', '20', '50'],
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Products</h1>
            <p className="text-slate-500">Manage your product inventory and catalog</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search products..."
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
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={paginationConfig}
          className="ant-table-custom"
          scroll={{ x: 800 }}
        />
      </div>

      {/* Create/Edit Product Modal */}
      <Modal
        title={editingProduct ? 'Edit Product' : 'Create New Product'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
        okText={editingProduct ? 'Update Product' : 'Create Product'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          name="product_form"
          className="mt-6"
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please input category!' }]}
            >
              <Input placeholder="e.g., Software, Service" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select status!' }]}
              initialValue="Draft"
            >
              <Select>
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
                <Select.Option value="Draft">Draft</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[{ required: true, message: 'Please input price!' }]}
            >
              <InputNumber
                placeholder="0.00"
                min={0}
                step={0.01}
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Stock Quantity"
              rules={[{ required: true, message: 'Please input stock quantity!' }]}
            >
              <InputNumber
                placeholder="0"
                min={0}
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea
              placeholder="Product description"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};