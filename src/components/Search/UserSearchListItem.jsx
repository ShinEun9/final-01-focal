import React from 'react';
import styled from 'styled-components';
import { UserInfo } from 'components/Common';

const StyledLi = styled.li`
  display: flex;

  & > a {
    width: 100%;
  }
`;

export default function UserSearchListItem({ user, searchQuery }) {
  return (
    <StyledLi>
      <UserInfo user={user} searchQuery={searchQuery} />
    </StyledLi>
  );
}
