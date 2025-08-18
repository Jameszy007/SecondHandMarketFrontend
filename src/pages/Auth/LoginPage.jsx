import React, { useContext, useState } from 'react';
import { Form, Button, Input, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { login, register } from '../../service/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { handleLoginSuccess } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const resp = await login(values);
      handleLoginSuccess(resp.token);
      navigate('/');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await register(values);
      message.success('Register Successfully');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 500, margin: '20px auto' }}>
      <Form form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            disabled={loading}
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            disabled={loading}
            placeholder="Password"
          />
        </Form.Item>
      </Form>
      <Space>
        <Button
          onClick={handleLogin}
          disabled={loading}
          shape="round"
          type="primary"
        >
          Log in
        </Button>
        <Button
          onClick={handleRegister}
          disabled={loading}
          shape="round"
          type="primary"
        >
          Register
        </Button>
      </Space>
    </div>
  );
};

export default LoginPage;