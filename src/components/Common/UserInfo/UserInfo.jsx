import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getProperImgSrc, handleImageError } from 'utils';

const UserInfoLink = styled(Link)`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;

  .userinfo-img {
    width: 50px;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }

  .userinfo-txt {
    width: 100%;
    margin-left: 12px;

    & > .username {
      color: black;
      font-weight: 500;
      font-size: 14px;

      & > .keyword {
        color: var(--main-color);
      }
    }

    & > .accountname {
      font-weight: 400;
      font-size: 12px;
      color: var(--sub-text-color);
      margin-top: 6px;
      width: 70%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }
`;

export default function UserInfo({ user, searchQuery = null }) {
  const searchUserName = () => {
    if (searchQuery) {
      return user.username.replaceAll(
        searchQuery,
        `<span class="keyword">${searchQuery}</span>`,
      );
    }
  };

  return (
    <UserInfoLink to={`/profile/${user.accountname}`}>
      <img
        className="userinfo-img"
        src={getProperImgSrc(user.image)}
        onError={handleImageError}
        alt="유저이미지"
      />
      <div className="userinfo-txt">
        {searchQuery ? (
          <strong
            className="username"
            dangerouslySetInnerHTML={{ __html: searchUserName() }}
          ></strong>
        ) : (
          <strong className="username">{user.username}</strong>
        )}
        <p className="accountname">@ {user.accountname}</p>
      </div>
    </UserInfoLink>
  );
}
