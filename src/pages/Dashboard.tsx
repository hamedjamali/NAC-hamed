import styled from "@emotion/styled";
import React, { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import './style.css';

const DashBoard: FC = () => {
  const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  `;
  const Menu = styled.div`
    display: flex;
    width: 400px;
    justify-content: space-between;
  `;
  const Item = styled.div`
    display: flex;
    cursor: pointer;
  `;
  return (
    <Main>
      <Menu>
        <Item>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"/home"}
          >
            <span>List item</span>
          </NavLink>
        </Item>
        <Item>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"fibonacci"}
          >
            <span>Fibonacci</span>
          </NavLink>
        </Item>
        <Item>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to={"collatz"}
          >
            <span>Collatz Conjecture</span>
          </NavLink>
        </Item>
      </Menu>
      <Outlet />
    </Main>
  );
};

export default DashBoard;
