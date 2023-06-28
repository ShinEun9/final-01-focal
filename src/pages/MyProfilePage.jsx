import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../states/LoginState';
import authInstance from '../api/instance/authInstance';
import Header from '../components/Header/Header';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileProducts from '../components/Profile/ProfileProducts';
import ProfilePosts from '../components/Profile/ProfilePosts';
import NavBar from '../components/NavBar/NavBar';
import BottomSheetModal from '../components/Modal/BottomSheetModal';
import BottomSheetContent from '../components/Modal/BottomSheetContent';
import ConfirmModal from '../components/Modal/ConfirmModal';
import useModal from '../hooks/useModal';
import Loading from '../components/Loading/Loading';

const Main = styled.main`
  width: 100%;
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 380px;
  margin-top: 48px;
  background-color: #f2f2f2;
  gap: 6px;
`;

export default function MyProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(true);
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
      try {
        const res = await authInstance.get('user/myinfo');
        const { user } = res.data;
        setUserData(user);
        setIsLoading(false);
      } catch (err) {
        console.error('Error :', err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      {isLoading && isProductLoading && isPostLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            type="basic"
            onClick={openMenu}
            ellipsisBtnShow={true}
            backBtnShow={false}
          />
          <Main>
            <h1 className="a11y-hidden">나의 프로필 페이지</h1>
            {userData && (
              <>
                <ProfileInfo userInfo={userData} />
                <ProfileProducts
                  accountname={userData.accountname}
                  setIsProductLoading={setIsProductLoading}
                />
                <ProfilePosts
                  accountname={userData.accountname}
                  setIsPostLoading={setIsPostLoading}
                />
              </>
            )}
          </Main>
          <NavBar />
        </>
      )}

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
