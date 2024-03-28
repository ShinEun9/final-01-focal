import React from 'react';
import styled from 'styled-components';
import { UserInfo } from 'components/Common';

const StyledLi = styled.li`
  display: flex;
  padding: 8px 16px;

  & > a {
    width: 100%;
  }
`;

export default function UserSearchListItem({ user, searchQuery, style }) {
  return (
    <StyledLi style={style}>
      <UserInfo user={user} searchQuery={searchQuery} />
    </StyledLi>
  );
}
