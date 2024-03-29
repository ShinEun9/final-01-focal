import { useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Header, NavBar, Loading } from 'layouts';
import { ProfileInfo, ProfileProducts, ProfilePosts } from 'components/Profile';
import { useProfileDataFetch } from 'hooks';

const Main = styled.main`
  width: 100%;
  height: calc(100dvh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ isLoading }) => (isLoading ? 'center' : 'flex-start')};
  min-width: 380px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function UserProfilePage() {
  const elementRef = useRef(null);

  const {
    profileInfo,
    productList,
    postList,
    isLoading,
    isUserIsSameWithLoginUser,
  } = useProfileDataFetch();

  const { account_name } = useParams();

  return (
    <>
      <>
        <Header type="basic" />
        <Main ref={elementRef} isLoading={isLoading}>
          <h1 className="a11y-hidden">${account_name}의 프로필 페이지</h1>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ProfileInfo
                profileInfo={profileInfo}
                isUserIsSameWithLoginUser={isUserIsSameWithLoginUser}
              />
              <ProfileProducts
                productList={productList}
                isUserIsSameWithLoginUser={isUserIsSameWithLoginUser}
              />
              <ProfilePosts
                elementRef={elementRef}
                postList={postList}
                isUserIsSameWithLoginUser={isUserIsSameWithLoginUser}
              />
            </>
          )}
        </Main>
        <NavBar />
      </>
    </>
  );
}
