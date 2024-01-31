import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (max-width: 640px) {
    img {
      height: 15rem;
    }
    h1{
      font-size:1rem;
    }
    span {
      color: #4e0eff;
      font-size:0.7rem;
    }
    h3{
      font-size:0.7rem;
    }
  }
  @media screen and (min-width: 641px) and (max-width: 1080px) {
    img {
      height: 20rem;
    }
    h1{
      font-size:0.9rem;
    }
    span {
      color: #4e0eff;
    }
    h3{
      font-size:0.9rem;
    }
  }
`;
