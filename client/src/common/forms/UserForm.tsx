import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { CREATE_USER } from '../mutations/create-user.mutation';
import { useMutation } from '@apollo/client';
import { User, useSession } from '../contexts/SessionContext';

interface UserFormProps {
  onSubmitted: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmitted }) => {
  //*** HOOKS ***//

  const { setUser } = useSession();
  const [messageApi, contextHolder] = message.useMessage();

  //*** GRAPHQL ***//

  const [createUser, { loading, error }] = useMutation<{ createUser: User }>(
    CREATE_USER,
  );

  //*** HANDLERS ***//

  const handleSubmission = async ({ username }: any) => {
    try {
      const newUser = await createUser({
        variables: { input: { username } },
      });

      if (newUser.data) {
        setUser(newUser.data.createUser);
        messageApi.open({
          type: 'success',
          content: `Welcome ${newUser.data.createUser.username}! You have successfully signed up.`,
        });
      }

      onSubmitted();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  //*** SIDE EFFECTS ***//

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: 'error',
        content:
          'Could not sign up to the shop, please try again in a few minutes or contact support.',
      });
    }
  }, [error, messageApi]);

  return (
    <>
      {contextHolder}
      <Form
        data-testid="user-form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        onFinish={handleSubmission}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input data-testid="username-input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password data-testid="password-input" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            data-testid="sign-up-button"
            loading={loading}
            type="primary"
            htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserForm;
