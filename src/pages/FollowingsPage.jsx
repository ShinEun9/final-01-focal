import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Loading } from 'layouts';
import { UserFollowListItem, FollowNone } from 'components/Follow';
import { useScrollBottom } from 'hooks';
import { followingAPI } from 'api/apis';

const Main = styled.main`
  width: 100%;
  height: calc(100dvh - 48px);
  overflow-y: auto;
  margin-top: 48px;

  & > section {
    padding: 24px 16px;

    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function FollowingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const accountname = location.state?.accountname;
  const [userData, setUserData] = useState([]);

  const elementRef = useRef(null);
  const isBottom = useScrollBottom(elementRef);
  const limit = 12;
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (isBottom) {
      setSkip((prevValue) => prevValue + limit);
      fetchFollowings(skip + limit);
    }
  }, [isBottom]);

  const fetchFollowings = async (skip) => {
    try {
      const res = await followingAPI(accountname, limit, skip);
      if (skip === 0) {
        setUserData(res);
      } else {
        setUserData((prevData) => [...prevData, ...res]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowings(skip);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Header type="basic" headerText="Followings" backBtnShow={true} />
      <Main ref={elementRef}>
        <h2 className="a11y-hidden">내가 팔로우 하는 사람 리스트</h2>
        {userData.length > 0 ? (
          <section>
            <ul>
              {userData.map((user) => (
                <UserFollowListItem key={user._id} user={user} />
              ))}
            </ul>
          </section>
        ) : (
          <FollowNone type="following" accountname={accountname} />
        )}
      </Main>
    </>
  );
}
