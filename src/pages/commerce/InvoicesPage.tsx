import { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select, 
  DatePicker, 
  InputNumber, 
  Tag, 
  Dropdown, 
  Card,
  Row,
  Col,
  Divider,
  message,
  Statistic,
  Descriptions
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  SendOutlined, 
  PrinterOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined
} from '@ant-design/icons';
import { Plus, FileText } from 'lucide-react';
import dayjs from 'dayjs';

interface InvoiceData {
  key: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const generateSampleInvoices = (): InvoiceData[] => {
  const statuses: InvoiceData['status'][] = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
  const customers = [
    { name: 'Acme Corporation', email: 'finance@acme.com' },
    { name: 'TechStart Inc', email: 'billing@techstart.com' },
    { name: 'Global Solutions', email: 'accounts@global.com' },
    { name: 'Innovation Labs', email: 'payments@innovation.com' },
    { name: 'Digital Dynamics', email: 'finance@digital.com' }
  ];

  return Array.from({ length: 25 }, (_, index) => {
    const customer = customers[index % customers.length];
    const status = statuses[index % statuses.length];
    const amount = Math.floor(Math.random() * 5000) + 500;
    const issueDate = dayjs().subtract(Math.floor(Math.random() * 60), 'day');
    const dueDate = issueDate.add(30, 'day');

    return {
      key: `INV-${String(index + 1).padStart(4, '0')}`,
      invoiceNumber: `INV-${String(index + 1).padStart(4, '0')}`,
      customerName: customer.name,
      customerEmail: customer.email,
      amount,
      status,
      issueDate: issueDate.format('YYYY-MM-DD'),
      dueDate: dueDate.format('YYYY-MM-DD'),
      items: [
        {
          id: '1',
          description: 'Professional Services',
          quantity: 10,
          unitPrice: amount / 10,
          total: amount
        }
      ]
    };
  });
};

export const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>(generateSampleInvoices());
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceData[]>(invoices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceData | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<InvoiceData | null>(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [form] = Form.useForm();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'green';
      case 'sent': return 'blue';
      case 'overdue': return 'red';
      case 'draft': return 'orange';
      case 'cancelled': return 'gray';
      default: return 'blue';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircleOutlined />;
      case 'sent': return <SendOutlined />;
      case 'overdue': return <ExclamationCircleOutlined />;
      case 'draft': return <EditOutlined />;
      case 'cancelled': return <CloseCircleOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterInvoices(value, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterInvoices(searchText, status);
  };

  const filterInvoices = (search: string, status: string) => {
    let filtered = invoices;

    if (search) {
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customerEmail.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(invoice => invoice.status === status);
    }

    setFilteredInvoices(filtered);
  };

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setInvoiceItems([{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }]);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice: InvoiceData) => {
    setEditingInvoice(invoice);
    setInvoiceItems(invoice.items);
    form.setFieldsValue({
      customerName: invoice.customerName,
      customerEmail: invoice.customerEmail,
      issueDate: dayjs(invoice.issueDate),
      dueDate: dayjs(invoice.dueDate),
      status: invoice.status
    });
    setIsModalOpen(true);
  };

  const handleViewInvoice = (invoice: InvoiceData) => {
    setViewingInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDeleteInvoice = (invoiceNumber: string) => {
    Modal.confirm({
      title: 'Delete Invoice',
      content: `Are you sure you want to delete invoice ${invoiceNumber}?`,
      onOk() {
        setInvoices(prev => prev.filter(inv => inv.invoiceNumber !== invoiceNumber));
        setFilteredInvoices(prev => prev.filter(inv => inv.invoiceNumber !== invoiceNumber));
        message.success('Invoice deleted successfully');
      }
    });
  };

  const handleSendInvoice = (invoice: InvoiceData) => {
    Modal.confirm({
      title: 'Send Invoice',
      content: `Send invoice ${invoice.invoiceNumber} to ${invoice.customerEmail}?`,
      onOk() {
        const updatedInvoices = invoices.map(inv => 
          inv.invoiceNumber === invoice.invoiceNumber 
            ? { ...inv, status: 'sent' as const }
            : inv
        );
        setInvoices(updatedInvoices);
        setFilteredInvoices(updatedInvoices.filter(inv => 
          statusFilter === 'all' || inv.status === statusFilter
        ));
        message.success('Invoice sent successfully');
      }
    });
  };

  const handleSaveInvoice = () => {
    form.validateFields()
      .then((values) => {
        const total = invoiceItems.reduce((sum, item) => sum + item.total, 0);
        const invoiceData: InvoiceData = {
          key: editingInvoice?.key || `INV-${String(invoices.length + 1).padStart(4, '0')}`,
          invoiceNumber: editingInvoice?.invoiceNumber || `INV-${String(invoices.length + 1).padStart(4, '0')}`,
          customerName: values.customerName,
          customerEmail: values.customerEmail,
          amount: total,
          status: values.status || 'draft',
          issueDate: values.issueDate.format('YYYY-MM-DD'),
          dueDate: values.dueDate.format('YYYY-MM-DD'),
          items: invoiceItems.filter(item => item.description && item.quantity > 0)
        };

        if (editingInvoice) {
          const updatedInvoices = invoices.map(inv => 
            inv.invoiceNumber === editingInvoice.invoiceNumber ? invoiceData : inv
          );
          setInvoices(updatedInvoices);
          setFilteredInvoices(updatedInvoices);
          message.success('Invoice updated successfully');
        } else {
          const newInvoices = [...invoices, invoiceData];
          setInvoices(newInvoices);
          setFilteredInvoices(newInvoices);
          message.success('Invoice created successfully');
        }

        setIsModalOpen(false);
        form.resetFields();
        setInvoiceItems([{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }]);
      })
      .catch((error) => {
        console.log('Validation failed:', error);
      });
  };

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: String(invoiceItems.length + 1),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }
    
    setInvoiceItems(updatedItems);
  };

  const removeInvoiceItem = (index: number) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
    }
  };

  const actionMenuItems = (invoice: InvoiceData) => [
    {
      key: 'view',
      label: 'View Details',
      icon: <EyeOutlined />,
      onClick: () => handleViewInvoice(invoice)
    },
    {
      key: 'edit',
      label: 'Edit Invoice',
      icon: <EditOutlined />,
      onClick: () => handleEditInvoice(invoice)
    },
    {
      key: 'send',
      label: 'Send Invoice',
      icon: <SendOutlined />,
      disabled: invoice.status === 'cancelled',
      onClick: () => handleSendInvoice(invoice)
    },
    {
      key: 'print',
      label: 'Print/Download',
      icon: <PrinterOutlined />,
      onClick: () => message.info('Print functionality would be implemented')
    },
    {
      type: 'divider' as const
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDeleteInvoice(invoice.invoiceNumber)
    }
  ];

  const columns: ColumnsType<InvoiceData> = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
      render: (text) => <span className="font-mono font-medium">{text}</span>
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-slate-500">{record.customerEmail}</div>
        </div>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `$${amount.toLocaleString()}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Draft', value: 'draft' },
        { text: 'Sent', value: 'sent' },
        { text: 'Paid', value: 'paid' },
        { text: 'Overdue', value: 'overdue' },
        { text: 'Cancelled', value: 'cancelled' }
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag 
          icon={getStatusIcon(status)} 
          color={getStatusColor(status)}
          className="capitalize"
        >
          {status}
        </Tag>
      )
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
      sorter: (a, b) => dayjs(a.issueDate).unix() - dayjs(b.issueDate).unix(),
      render: (date) => dayjs(date).format('MMM DD, YYYY')
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (date, record) => {
        const isOverdue = dayjs(date).isBefore(dayjs()) && record.status !== 'paid';
        return (
          <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
            {dayjs(date).format('MMM DD, YYYY')}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, invoice) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewInvoice(invoice)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditInvoice(invoice)}
          />
          <Dropdown 
            menu={{ items: actionMenuItems(invoice) }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Statistics calculations
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => ['sent', 'overdue'].includes(inv.status)).reduce((sum, inv) => sum + inv.amount, 0);

  const pagination: TablePaginationConfig = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} invoices`
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Invoices
          </h1>
          <p className="text-slate-500 mt-1">Manage and track all your invoices</p>
        </div>
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={handleCreateInvoice}
          className="bg-slate-900 hover:bg-slate-800 border-slate-900"
        >
          Create Invoice
        </Button>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Invoices"
              value={totalInvoices}
              prefix={<FileText className="w-4 h-4" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Amount"
              value={totalAmount}
              prefix="$"
              precision={0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Paid Amount"
              value={paidAmount}
              prefix="$"
              precision={0}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Amount"
              value={pendingAmount}
              prefix="$"
              precision={0}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="Search invoices..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="Filter by status"
              style={{ width: '100%' }}
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="sent">Sent</Select.Option>
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="overdue">Overdue</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Space>
              <Button icon={<DownloadOutlined />}>Export</Button>
              <Button icon={<PrinterOutlined />}>Print</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Invoices Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredInvoices}
          pagination={pagination}
          scroll={{ x: 800 }}
          className="invoice-table"
        />
      </Card>

      {/* Create/Edit Invoice Modal */}
      <Modal
        title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
        open={isModalOpen}
        onOk={handleSaveInvoice}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setInvoiceItems([{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }]);
        }}
        width={800}
        okText={editingInvoice ? 'Update Invoice' : 'Create Invoice'}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label="Customer Name"
                rules={[{ required: true, message: 'Please enter customer name' }]}
              >
                <Input placeholder="Enter customer name" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="issueDate"
                label="Issue Date"
                rules={[{ required: true, message: 'Please select issue date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please select due date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="Status">
                <Select placeholder="Select status">
                  <Select.Option value="draft">Draft</Select.Option>
                  <Select.Option value="sent">Sent</Select.Option>
                  <Select.Option value="paid">Paid</Select.Option>
                  <Select.Option value="overdue">Overdue</Select.Option>
                  <Select.Option value="cancelled">Cancelled</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider>Invoice Items</Divider>

          {invoiceItems.map((item, index) => (
            <Row key={item.id} gutter={16} align="middle" className="mb-4">
              <Col span={10}>
                <Input
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(value) => updateInvoiceItem(index, 'quantity', value || 1)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={5}>
                <InputNumber
                  min={0}
                  precision={2}
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(value) => updateInvoiceItem(index, 'unitPrice', value || 0)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={4}>
                <Input value={`$${item.total.toFixed(2)}`} disabled />
              </Col>
              <Col span={1}>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeInvoiceItem(index)}
                  disabled={invoiceItems.length === 1}
                />
              </Col>
            </Row>
          ))}

          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addInvoiceItem}
            className="w-full mb-4"
          >
            Add Item
          </Button>

          <div className="text-right">
            <strong>
              Total: ${invoiceItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
            </strong>
          </div>
        </Form>
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        title={`Invoice ${viewingInvoice?.invoiceNumber}`}
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />}>
            Print
          </Button>,
          <Button key="send" type="primary" icon={<SendOutlined />} className="bg-slate-900 hover:bg-slate-800 border-slate-900">
            Send Email
          </Button>,
          <Button key="close" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {viewingInvoice && (
          <div className="p-4">
            <Descriptions title="Invoice Details" bordered column={2}>
              <Descriptions.Item label="Invoice Number">
                {viewingInvoice.invoiceNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(viewingInvoice.status)} className="capitalize">
                  {viewingInvoice.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Customer">
                {viewingInvoice.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {viewingInvoice.customerEmail}
              </Descriptions.Item>
              <Descriptions.Item label="Issue Date">
                {dayjs(viewingInvoice.issueDate).format('MMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {dayjs(viewingInvoice.dueDate).format('MMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount" span={2}>
                <span className="text-lg font-bold">${viewingInvoice.amount.toLocaleString()}</span>
              </Descriptions.Item>
            </Descriptions>

            <Divider>Items</Divider>
            
            <Table
              columns={[
                { title: 'Description', dataIndex: 'description', key: 'description' },
                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: 100 },
                { 
                  title: 'Unit Price', 
                  dataIndex: 'unitPrice', 
                  key: 'unitPrice', 
                  width: 120,
                  render: (price) => `$${price.toFixed(2)}`
                },
                { 
                  title: 'Total', 
                  dataIndex: 'total', 
                  key: 'total', 
                  width: 120,
                  render: (total) => `$${total.toFixed(2)}`
                }
              ]}
              dataSource={viewingInvoice.items.map((item, index) => ({ ...item, key: index }))}
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};