import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FibonacciPage from './pages/FibonacciPage';
import CollatzPage from './pages/CollatzPage';
import EditPage from './pages/EditPage';
import DashBoard from './pages/Dashboard';
import AddItem from './pages/AddItem';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route  path="/" element={<DashBoard />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/add" element={<AddItem />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route
        path="/"
        element={<Navigate to="/home" replace />}
    />
      <Route path="/fibonacci" element={<FibonacciPage />} />
      <Route path="/collatz" element={<CollatzPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
