import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../store/userStore';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled';

const schema = yup.object().shape({
  name: yup.string().required(),
  userName: yup.string().min(6).matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).matches(/^[0-9]+$/).required(),
  status: yup.string().oneOf(['active', 'not_active', 'unknown']),
});

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 800px;
  max-width: 100%;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 14px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:disabled {
    background-color: #ccc;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
`;

const UserForm: FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, formState } = useForm({
    resolver: yupResolver(schema)
  });
  const addUser = useUserStore((state) => state.addUser);

  const onSubmit = (data: any) => {
    addUser({ ...data, id: Date.now() });
    reset();
  };

  return (
    <FormWrapper>
      <Box>
        <Title>Create New Item</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label>Name</Label>
            <Input {...register('name')} />
            {errors.name && <ErrorMessage>This field is required</ErrorMessage>}
          </Field>
          <Field>
            <Label>Username</Label>
            <Input {...register('userName')} />
            {errors.userName && <ErrorMessage>Username must be at least 6 characters and include numbers and letters</ErrorMessage>}
          </Field>
          <Field>
            <Label>Email</Label>
            <Input {...register('email')} />
            {errors.email && <ErrorMessage>Invalid email address</ErrorMessage>}
          </Field>
          <Field>
            <Label>Phone</Label>
            <Input {...register('phone')} />
            {errors.phone && <ErrorMessage>Phone must be at least 10 digits</ErrorMessage>}
          </Field>
          <Field>
            <Label>Status</Label>
            <Select {...register('status')}>
              <option value="active">Active</option>
              <option value="not_active">Not Active</option>
              <option value="unknown">Unknown</option>
            </Select>
          </Field>
          <Button type="submit" disabled={!formState.isValid}>Submit</Button>
        </form>
      </Box>
    </FormWrapper>
  );
};

export default UserForm;
