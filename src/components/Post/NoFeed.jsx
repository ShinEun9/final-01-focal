import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common';
import logo from 'assets/images/logo.png';

const Img = styled.img`
  width: 100px;
  filter: grayscale(90%);
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

const NoFeed = () => {
  const navigate = useNavigate();
  return (
    <>
      <Img src={logo} alt="Focal 로고" />
      <Info>유저를 검색해 팔로우 해보세요!</Info>
      <Button
        type="button"
        className="md"
        onClick={() => {
          navigate('/search');
        }}
      >
        검색하기
      </Button>
    </>
  );
};

export default NoFeed;
