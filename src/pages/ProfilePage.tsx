import { useState } from 'react';
import { Card, Row, Col, Form, Input, Button, Upload, Avatar, Divider, message, Switch, Select } from 'antd';
import { UserOutlined, CameraOutlined, EditOutlined, SecurityScanOutlined, NotificationOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

export const ProfilePage = () => {
  const [personalForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture',
    maxCount: 1,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      return false; // Prevent actual upload for demo
    },
  };

  const handlePersonalInfoSave = () => {
    personalForm
      .validateFields()
      .then((values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          console.log('Personal info updated:', values);
          message.success('Personal information updated successfully!');
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log('Personal info validation failed:', error);
      });
  };

  const handleSecuritySave = () => {
    securityForm
      .validateFields()
      .then((values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          console.log('Security settings updated:', values);
          message.success('Security settings updated successfully!');
          setLoading(false);
          securityForm.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
        }, 1000);
      })
      .catch((error) => {
        console.log('Security validation failed:', error);
      });
  };

  const handlePreferencesSave = () => {
    preferencesForm
      .validateFields()
      .then((values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          console.log('Preferences updated:', values);
          message.success('Preferences updated successfully!');
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log('Preferences validation failed:', error);
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Picture & Basic Info */}
        <Col span={24}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>Personal Information</span>
              </div>
            }
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={8} md={6} className="text-center">
                <Avatar
                  size={120}
                  src={avatarUrl}
                  icon={!avatarUrl && <UserOutlined />}
                  className="mb-4"
                />
                <div>
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button 
                      icon={<CameraOutlined />}
                      className="mb-2"
                      block
                    >
                      Change Photo
                    </Button>
                  </Upload>
                  <p className="text-xs text-slate-500">Max 2MB, JPG/PNG only</p>
                </div>
              </Col>

              <Col xs={24} sm={16} md={18}>
                <Form
                  form={personalForm}
                  layout="vertical"
                  initialValues={{
                    firstName: 'Aigars',
                    lastName: 'Silkalns',
                    email: 'aigars@zenith.com',
                    phone: '+1 (555) 123-4567',
                    title: 'Senior Administrator',
                    department: 'Operations',
                    location: 'New York, NY',
                    bio: 'Experienced administrator with 10+ years in operations management.'
                  }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                      >
                        <Input placeholder="Enter first name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                      >
                        <Input placeholder="Enter last name" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter valid email' }
                        ]}
                      >
                        <Input placeholder="Enter email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Phone"
                      >
                        <Input placeholder="Enter phone number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="title"
                        label="Job Title"
                      >
                        <Input placeholder="Enter job title" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="department"
                        label="Department"
                      >
                        <Select placeholder="Select department">
                          <Select.Option value="Operations">Operations</Select.Option>
                          <Select.Option value="Sales">Sales</Select.Option>
                          <Select.Option value="Marketing">Marketing</Select.Option>
                          <Select.Option value="Engineering">Engineering</Select.Option>
                          <Select.Option value="Finance">Finance</Select.Option>
                          <Select.Option value="HR">Human Resources</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="location"
                    label="Location"
                  >
                    <Input placeholder="Enter location" />
                  </Form.Item>

                  <Form.Item
                    name="bio"
                    label="Bio"
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </Form.Item>

                  <Button 
                    type="primary"
                    onClick={handlePersonalInfoSave}
                    loading={loading}
                    icon={<EditOutlined />}
                    className="bg-slate-900 hover:bg-slate-800 border-slate-900"
                  >
                    Save Changes
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col span={24}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <SecurityScanOutlined />
                <span>Security Settings</span>
              </div>
            }
          >
            <Form
              form={securityForm}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter current password' }]}
                  >
                    <Input.Password placeholder="Enter current password" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter new password' },
                      { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                  >
                    <Input.Password placeholder="Enter new password" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Divider />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">Login Notifications</h4>
                    <p className="text-sm text-slate-500">Get notified when someone logs into your account</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>

              <Divider />

              <Button 
                type="primary"
                onClick={handleSecuritySave}
                loading={loading}
                icon={<SecurityScanOutlined />}
                className="bg-slate-900 hover:bg-slate-800 border-slate-900"
              >
                Update Security Settings
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Preferences */}
        <Col span={24}>
          <Card 
            title={
              <div className="flex items-center gap-2">
                <NotificationOutlined />
                <span>Preferences</span>
              </div>
            }
          >
            <Form
              form={preferencesForm}
              layout="vertical"
              initialValues={{
                language: 'en',
                timezone: 'America/New_York',
                emailNotifications: true,
                pushNotifications: true,
                weeklyReports: true,
                monthlyReports: false,
                theme: 'light'
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="language"
                    label="Language"
                  >
                    <Select>
                      <Select.Option value="en">English</Select.Option>
                      <Select.Option value="es">Spanish</Select.Option>
                      <Select.Option value="fr">French</Select.Option>
                      <Select.Option value="de">German</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="timezone"
                    label="Timezone"
                  >
                    <Select>
                      <Select.Option value="America/New_York">Eastern Time</Select.Option>
                      <Select.Option value="America/Chicago">Central Time</Select.Option>
                      <Select.Option value="America/Denver">Mountain Time</Select.Option>
                      <Select.Option value="America/Los_Angeles">Pacific Time</Select.Option>
                      <Select.Option value="UTC">UTC</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="theme"
                label="Theme Preference"
              >
                <Select>
                  <Select.Option value="light">Light</Select.Option>
                  <Select.Option value="dark">Dark</Select.Option>
                  <Select.Option value="auto">Auto (System)</Select.Option>
                </Select>
              </Form.Item>

              <Divider />

              <h4 className="font-semibold text-slate-900 mb-4">Notification Preferences</h4>
              
              <div className="space-y-4">
                <Form.Item
                  name="emailNotifications"
                  valuePropName="checked"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-slate-900">Email Notifications</h5>
                      <p className="text-sm text-slate-500">Receive email updates about your account</p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item
                  name="pushNotifications"
                  valuePropName="checked"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-slate-900">Push Notifications</h5>
                      <p className="text-sm text-slate-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item
                  name="weeklyReports"
                  valuePropName="checked"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-slate-900">Weekly Reports</h5>
                      <p className="text-sm text-slate-500">Get weekly summary of your dashboard activity</p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>

                <Form.Item
                  name="monthlyReports"
                  valuePropName="checked"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-slate-900">Monthly Reports</h5>
                      <p className="text-sm text-slate-500">Get monthly analytics and insights</p>
                    </div>
                    <Switch />
                  </div>
                </Form.Item>
              </div>

              <Divider />

              <Button 
                type="primary"
                onClick={handlePreferencesSave}
                loading={loading}
                icon={<NotificationOutlined />}
                className="bg-slate-900 hover:bg-slate-800 border-slate-900"
              >
                Save Preferences
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};