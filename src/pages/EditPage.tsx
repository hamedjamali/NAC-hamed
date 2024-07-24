import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserStore } from "../store/userStore";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  userName: yup
    .string()
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Username must contain both letters and numbers"
    )
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  status: yup
    .string()
    .oneOf(["active", "not_active", "unknown"], "Invalid status"),
});

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  flex-direction: column;
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
  padding: 8px;
}
`;
const Star = styled.span`
  color: red;
}
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  margin-bottom: 8px;
  //   font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  width: 300px;
  height: 30px;
`;

const Select = styled.select`
  width: 100%;
  //   padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 300px;
  height: 30px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;
const FormBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  width: 140px;
  height: 40px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
`;
const TitleLight = styled.span`
  font-size: 20px;
  font-weight: 300;

  //   text-align: center;
  //   margin-bottom: 40px;
`;
const BoxLine = styled.div`
  display: flex;
  justify-content: center;
  //   border: 1px solid #ccc;
  border-radius: 4px;
  width: 854px;
  margin-top: 24px;
  padding: 12px;
  align-items: center;
  justify-content: right;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const EditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);
  const updateUser = useUserStore((state) => state.updateUser);

  const user = users.find((u) => u.id === parseInt(id!));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    formState,
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: user,
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("userName", user.userName);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("status", user.status);
    }
  }, [user, setValue]);

  const onSubmit = (data: any) => {
    updateUser({ ...data, id: user!.id });
    navigate("/");
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Title>
            Edit <TitleLight> Item</TitleLight>
          </Title>

          <FormBox>
            <Field>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Username</Label>
              <Input {...register("userName")} />
              {errors.userName && (
                <ErrorMessage>{errors.userName.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Email</Label>
              <Input {...register("email")} />
              {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Phone</Label>
              <Input {...register("phone")} />
              {errors.phone && (
                <ErrorMessage>{errors.phone.message}</ErrorMessage>
              )}
            </Field>
            <Field>
              <Label>Status</Label>
              <Select {...register("status")}>
                <option value="active">Active</option>
                <option value="not_active">Not Active</option>
                <option value="unknown">Unknown</option>
              </Select>
              {errors.status && (
                <ErrorMessage>{errors.status.message}</ErrorMessage>
              )}
            </Field>
          </FormBox>
        </Box>
        <BoxLine>
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </BoxLine>
      </form>
    </FormWrapper>
  );
};

export default EditPage;
