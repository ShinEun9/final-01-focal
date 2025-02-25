import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  Header,
  NavBar,
  Loading,
  BottomSheetModal,
  ConfirmModal,
  BottomSheetContent,
} from 'layouts';
import { ProfileInfo, ProfileProducts, ProfilePosts } from 'components/Profile';
import { loginState } from 'states';
import { useModal, useProfileDataFetch } from 'hooks';

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

export default function MyProfilePage() {
  const elementRef = useRef(null);

  const {
    profileInfo,
    productList,
    postList,
    isLoading,
    isUserIsSameWithLoginUser,
  } = useProfileDataFetch();

  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();
  const setIsLogined = useSetRecoilState(loginState);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountname');
    localStorage.removeItem('image');
    setIsLogined(false);
  };

  return (
    <>
      <Header
        type="basic"
        onClick={openMenu}
        ellipsisBtnShow={true}
        backBtnShow={false}
      />
      <Main ref={elementRef} isLoading={isLoading}>
        <h1 className="a11y-hidden">나의 프로필 페이지</h1>

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

      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          <BottomSheetContent
            onClick={() => {
              navigate('/profile/edit');
            }}
          >
            설정 및 개인정보
          </BottomSheetContent>
          <BottomSheetContent onClick={openModal}>로그아웃</BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="로그아웃하시겠어요?"
          confirmInfo="로그아웃"
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
          onClick={handleLogout}
        />
      )}
    </>
  );
}
