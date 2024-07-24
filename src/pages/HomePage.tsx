import React, { FC, useState } from 'react';
import { useUserStore } from '../store/userStore';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import Pagination from '../components/Pagination';

const HomePage: FC = () => {
  const users = useUserStore((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div style={{width: '90%'}}>
      <h1>List Item</h1>
      <UserList users={currentUsers} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
    
  );
};

export default HomePage;
