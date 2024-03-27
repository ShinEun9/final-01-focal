import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { loginState } from 'states';
import {
  Header,
  NavBar,
  Loading,
  BottomSheetModal,
  ConfirmModal,
  BottomSheetContent,
} from 'layouts';
import { ProfileInfo, ProfileProducts, ProfilePosts } from 'components/Profile';
import { useModal } from 'hooks';
import { getMyInfoAPI } from 'api/apis/user';
import {
  loadingStateFamily,
  profileLoadingState,
} from 'states/ProfileLoadingState';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ isProfileLoading }) =>
    isProfileLoading ? 'center' : 'flex-start'};
  min-width: 380px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function MyProfilePage() {
  const elementRef = useRef(null);
  const isProfileLoading = useRecoilValue(profileLoadingState);
  const setIsUserLoading = useSetRecoilState(loadingStateFamily('user'));

  const [userData, setUserData] = useState('');
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

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getMyInfoAPI();
      setUserData(user);
      setIsUserLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Header
        type="basic"
        onClick={openMenu}
        ellipsisBtnShow={true}
        backBtnShow={false}
      />
      <Main ref={elementRef} isProfileLoading={isProfileLoading}>
        <h1 className="a11y-hidden">나의 프로필 페이지</h1>

        {isProfileLoading && <Loading />}
        {userData && (
          <>
            <ProfileInfo userInfo={userData} setUserData={setUserData} />
            <ProfileProducts
              accountname={userData.accountname}
              // setIsProductLoading={setIsProductLoading}
            />
            <ProfilePosts
              elementRef={elementRef}
              accountname={userData.accountname}
              // setIsPostLoading={setIsPostLoading}
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
