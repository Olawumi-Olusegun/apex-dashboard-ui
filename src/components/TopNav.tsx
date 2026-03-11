
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Bell, Menu, UserCircle, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';
import { Modal, Badge, Dropdown, Input, Button, Form, Select, DatePicker, InputNumber, message } from 'antd';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #12345 has been placed by John Doe',
    time: '2 minutes ago',
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Headphones" is running low',
    time: '15 minutes ago',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $249.99 has been confirmed',
    time: '1 hour ago',
    read: true,
    type: 'success'
  },
  {
    id: '4',
    title: 'System Update',
    message: 'Dashboard updated to version 2.1.0',
    time: '3 hours ago',
    read: true,
    type: 'info'
  }
];

export const TopNav = () => {
  const { toggleMobileMenu } = useDashboardStore();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [newOrderForm] = Form.useForm();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserCircle className="w-4 h-4" />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => console.log('Settings clicked')
    },
    {
      key: 'help',
      label: 'Help & Support',
      icon: <HelpCircle className="w-4 h-4" />,
      onClick: () => console.log('Help clicked')
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Log out',
      icon: <LogOut className="w-4 h-4" />,
      onClick: () => console.log('Logout clicked'),
      danger: true
    }
  ];

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      console.log('Searching for:', value);
      // Here you would implement actual search functionality
    }
  };

  const handleNewOrder = () => {
    newOrderForm
      .validateFields()
      .then((values) => {
        console.log('New order:', values);
        message.success('Order created successfully!');
        setIsNewOrderModalOpen(false);
        newOrderForm.resetFields();
      })
      .catch((error) => {
        console.log('Validation failed:', error);
      });
  };

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md lg:max-w-96 mx-4 lg:mx-0 relative">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchValue)}
          className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl pl-9 sm:pl-10 pr-8 sm:pr-12 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
          <kbd className="text-[10px] font-sans font-medium text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-6">
        <button 
          onClick={() => setIsNewOrderModalOpen(true)}
          className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">New Order</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4 text-slate-500">
          {/* Notifications */}
          <Badge count={unreadCount} size="small" offset={[-2, 2]}>
            <button 
              onClick={() => setIsNotificationModalOpen(true)}
              className="hover:text-slate-900 transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Badge>
        </div>

        {/* User Profile */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <button className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium text-xs sm:text-sm cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-slate-900 transition-all">
            AS
          </button>
        </Dropdown>
      </div>

      {/* Notifications Modal */}
      <Modal
        title={
          <div className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button
                type="text"
                size="small"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </Button>
            )}
          </div>
        }
        open={isNotificationModalOpen}
        onCancel={() => setIsNotificationModalOpen(false)}
        footer={null}
        width={500}
      >
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    notification.read 
                      ? 'bg-slate-50 border-slate-200' 
                      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold text-sm ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${notification.read ? 'text-slate-500' : 'text-slate-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${getNotificationTypeColor(notification.type)}`}>
                      <div className="w-full h-full bg-current rounded-full opacity-20" />
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length > 0 && (
                <div className="text-center pt-3 border-t border-slate-200">
                  <Button
                    type="link"
                    onClick={() => {
                      navigate('/notifications');
                      setIsNotificationModalOpen(false);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All Notifications ({notifications.length})
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* New Order Modal */}
      <Modal
        title="Create New Order"
        open={isNewOrderModalOpen}
        onOk={handleNewOrder}
        onCancel={() => {
          setIsNewOrderModalOpen(false);
          newOrderForm.resetFields();
        }}
        width={600}
        okText="Create Order"
        cancelText="Cancel"
      >
        <Form
          form={newOrderForm}
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
                <Select.Option value="wireless-headphones">Wireless Headphones</Select.Option>
                <Select.Option value="smart-watch">Smart Watch</Select.Option>
                <Select.Option value="bluetooth-speaker">Bluetooth Speaker</Select.Option>
                <Select.Option value="phone-case">Phone Case</Select.Option>
                <Select.Option value="tablet">Tablet</Select.Option>
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
    </header>
  );
};
