import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { UserEntity } from "../store/userStore";
import { Add } from "./svg/Svg";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 4px 0;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: #FAFAFA;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  cursor: pointer;
`;
const Button = styled.button`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  border-radius: 14px;
  width: 130px;
  justify-content: space-between;
`;
const Header = styled.div`
  display: flex;
    justify-content: space-between;
    padding: 4px 12px;
`;

const Badge = styled.span<{ status: "active" | "not_active" | null }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status }) =>
    status === "active" ? "green" : status === "not_active" ? "red" : "gray"};
  color: white;
`;

interface UserListProps {
  users: UserEntity[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/home/edit/${id}`);
  };
  const addItem = () => {
    navigate(`/home/add`);
  };

  return (
    <div>
      <Header>
        <div><span>Items</span></div>
        <div>
        <Button onClick={addItem}>
            <span> Add New Item </span>
            <span>
              <Add />
            </span>
          </Button>
        </div>
      </Header>
    <Table>
      {/* <thead>
        <th colSpan={2}>
          <span>Items</span>
        </th>
        <th colSpan={3}>
          <Button>
            <span> Add New Item </span>
            <span>
              <Add />
            </span>
          </Button>
        </th>
      </thead> */}
      <thead>
        <tr>
          <Th>Name</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => handleClick(user.id)}>
            <Td>{user.name}</Td>
            <Td>{user.userName}</Td>
            <Td>{user.email}</Td>
            <Td>{user.phone}</Td>
            <Td>
              <Badge status={user.status}>{user.status}</Badge>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default UserList;
