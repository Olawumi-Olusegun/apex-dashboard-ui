import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Progress, Modal, Form, Input, Select, Space, Popconfirm, Descriptions, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, PhoneOutlined, MailOutlined, UserOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface Lead {
  key: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed Won' | 'Closed Lost';
  value: number;
  source: string;
  assignedTo: string;
  lastContact: string;
}

const generateLeads = (): Lead[] => {
  const leads = [
    { name: 'John Smith', company: 'Tech Corp', email: 'john@techcorp.com', phone: '+1-555-0101' },
    { name: 'Sarah Johnson', company: 'Design Studio', email: 'sarah@design.com', phone: '+1-555-0102' },
    { name: 'Mike Wilson', company: 'StartupXYZ', email: 'mike@startup.com', phone: '+1-555-0103' },
    { name: 'Emily Davis', company: 'Enterprise Inc', email: 'emily@enterprise.com', phone: '+1-555-0104' },
    { name: 'David Brown', company: 'Innovation Labs', email: 'david@innovation.com', phone: '+1-555-0105' },
  ];

  const statuses: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won', 'Closed Lost'];
  const sources = ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Email Campaign'];
  const salesReps = ['Alice Cooper', 'Bob Johnson', 'Carol Smith', 'David Lee'];

  return leads.map((lead, index) => ({
    key: `${index + 1}`,
    ...lead,
    status: statuses[index % statuses.length],
    value: Math.floor(Math.random() * 50000) + 5000,
    source: sources[index % sources.length],
    assignedTo: salesReps[index % salesReps.length],
    lastContact: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));
};

export const CRMPage = () => {
  const [leads, setLeads] = useState<Lead[]>(generateLeads());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      'New': 'blue',
      'Contacted': 'cyan',
      'Qualified': 'green',
      'Proposal': 'orange',
      'Closed Won': 'green',
      'Closed Lost': 'red',
    };
    return colors[status];
  };

  const columns: ColumnsType<Lead> = [
    {
      title: 'Lead',
      key: 'lead',
      render: (_, record) => (
        <div>
          <div className="font-medium text-slate-900">{record.name}</div>
          <div className="text-sm text-slate-500">{record.company}</div>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <MailOutlined className="text-slate-400" />
            <span className="text-slate-600">{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <PhoneOutlined className="text-slate-400" />
            <span className="text-slate-600">{record.phone}</span>
          </div>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)} className="font-medium">
          {status}
        </Tag>
      ),
      filters: [
        { text: 'New', value: 'New' },
        { text: 'Contacted', value: 'Contacted' },
        { text: 'Qualified', value: 'Qualified' },
        { text: 'Proposal', value: 'Proposal' },
        { text: 'Closed Won', value: 'Closed Won' },
        { text: 'Closed Lost', value: 'Closed Lost' },
      ],
      onFilter: (value: any, record) => record.status === value,
      width: '15%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => `$${value.toLocaleString()}`,
      sorter: (a, b) => a.value - b.value,
      width: '12%',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: '12%',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: '16%',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '15%',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            title="View Details"
          />
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Edit Lead"
          />
          <Popconfirm
            title="Delete Lead"
            description="Are you sure you want to delete this lead?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Button
              type="default"
              size="small"
              danger
              icon={<DeleteOutlined />}
              title="Delete Lead"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddLead = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(() => {
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleView = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewModalVisible(true);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    editForm.setFieldsValue(lead);
    setIsEditModalVisible(true);
  };

  const handleEditSave = () => {
    editForm.validateFields().then((values) => {
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.key === selectedLead?.key 
            ? { ...lead, ...values }
            : lead
        )
      );
      setIsEditModalVisible(false);
      editForm.resetFields();
      setSelectedLead(null);
      message.success('Lead updated successfully');
    });
  };

  const handleDelete = (key: string) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.key !== key));
    message.success('Lead deleted successfully');
  };

  const salesPipeline = [
    { stage: 'New Leads', count: 45, value: 225000 },
    { stage: 'Contacted', count: 32, value: 180000 },
    { stage: 'Qualified', count: 28, value: 165000 },
    { stage: 'Proposal', count: 15, value: 120000 },
    { stage: 'Closed Won', count: 8, value: 85000 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">CRM</h1>
            <p className="text-slate-500">Manage customer relationships and sales pipeline</p>
          </div>
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddLead}
            className="bg-slate-900 hover:bg-slate-800 border-slate-900"
          >
            Add Lead
          </Button>
        </div>
      </div>

      {/* CRM Metrics */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">248</p>
                <p className="text-xs text-green-500">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserOutlined className="text-blue-600 text-xl" />
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">24.5%</p>
                <p className="text-xs text-green-500">+2.1% this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 text-xl">%</span>
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Pipeline Value</p>
                <p className="text-2xl font-bold text-slate-900">$775K</p>
                <p className="text-xs text-green-500">+8.3% this month</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <span className="text-orange-600 text-xl">$</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Sales Pipeline */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={16}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Sales Pipeline</h3>
              <p className="text-sm text-slate-500">Current pipeline stages and values</p>
            </div>
            
            <div className="space-y-4">
              {salesPipeline.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-900">{stage.stage}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{stage.count} leads</div>
                        <div className="text-xs text-slate-500">${stage.value.toLocaleString()}</div>
                      </div>
                    </div>
                    <Progress 
                      percent={(stage.count / 50) * 100} 
                      showInfo={false}
                      strokeColor="#f4722b"
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
              <p className="text-sm text-slate-500">Latest sales activities</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">New lead from website</p>
                  <p className="text-xs text-slate-500">Sarah Johnson - 2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Deal closed successfully</p>
                  <p className="text-xs text-slate-500">Mike Wilson - $25,000 - 1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Follow-up call scheduled</p>
                  <p className="text-xs text-slate-500">Emily Davis - Tomorrow 2 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Proposal sent</p>
                  <p className="text-xs text-slate-500">David Brown - 3 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Leads Table */}
      <Card>
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">All Leads</h3>
          <p className="text-sm text-slate-500">Manage and track all your sales leads</p>
        </div>
        
        <Table
          columns={columns}
          dataSource={leads}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} leads`,
          }}
          className="ant-table-custom"
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Add Lead Modal */}
      <Modal
        title="Add New Lead"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Add Lead"
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="company" label="Company" rules={[{ required: true }]}>
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="source" label="Lead Source" rules={[{ required: true }]}>
                <Select placeholder="Select source">
                  <Select.Option value="Website">Website</Select.Option>
                  <Select.Option value="LinkedIn">LinkedIn</Select.Option>
                  <Select.Option value="Referral">Referral</Select.Option>
                  <Select.Option value="Cold Call">Cold Call</Select.Option>
                  <Select.Option value="Email Campaign">Email Campaign</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="value" label="Estimated Value ($)">
                <Input type="number" placeholder="Enter estimated value" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* View Lead Modal */}
      <Modal
        title="Lead Details"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsViewModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedLead && (
          <Descriptions bordered column={2} className="mt-4">
            <Descriptions.Item label="Name" span={1}>
              {selectedLead.name}
            </Descriptions.Item>
            <Descriptions.Item label="Company" span={1}>
              {selectedLead.company}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={1}>
              {selectedLead.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone" span={1}>
              {selectedLead.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={1}>
              <Tag color={getStatusColor(selectedLead.status)} className="font-medium">
                {selectedLead.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Value" span={1}>
              ${selectedLead.value.toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Source" span={1}>
              {selectedLead.source}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned To" span={1}>
              {selectedLead.assignedTo}
            </Descriptions.Item>
            <Descriptions.Item label="Last Contact" span={2}>
              {selectedLead.lastContact}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Edit Lead Modal */}
      <Modal
        title="Edit Lead"
        open={isEditModalVisible}
        onOk={handleEditSave}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
          setSelectedLead(null);
        }}
        okText="Save Changes"
        width={600}
        className="edit-lead-modal"
      >
        <Form form={editForm} layout="vertical" className="mt-6">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="company" label="Company" rules={[{ required: true }]}>
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select placeholder="Select status">
                  <Select.Option value="New">New</Select.Option>
                  <Select.Option value="Contacted">Contacted</Select.Option>
                  <Select.Option value="Qualified">Qualified</Select.Option>
                  <Select.Option value="Proposal">Proposal</Select.Option>
                  <Select.Option value="Closed Won">Closed Won</Select.Option>
                  <Select.Option value="Closed Lost">Closed Lost</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="source" label="Lead Source" rules={[{ required: true }]}>
                <Select placeholder="Select source">
                  <Select.Option value="Website">Website</Select.Option>
                  <Select.Option value="LinkedIn">LinkedIn</Select.Option>
                  <Select.Option value="Referral">Referral</Select.Option>
                  <Select.Option value="Cold Call">Cold Call</Select.Option>
                  <Select.Option value="Email Campaign">Email Campaign</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="value" label="Estimated Value ($)">
                <Input type="number" placeholder="Enter estimated value" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="assignedTo" label="Assigned To">
                <Select placeholder="Select sales rep">
                  <Select.Option value="Alice Cooper">Alice Cooper</Select.Option>
                  <Select.Option value="Bob Johnson">Bob Johnson</Select.Option>
                  <Select.Option value="Carol Smith">Carol Smith</Select.Option>
                  <Select.Option value="David Lee">David Lee</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};