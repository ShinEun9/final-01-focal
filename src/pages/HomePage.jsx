import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common';
import {
  Header,
  NavBar,
  BottomSheetModal,
  BottomSheetContent,
  ConfirmModal,
  Loading,
} from 'layouts';
import { PostsFeed } from 'components/Post';
import { useModal, useScrollToTop } from 'hooks';
import logo from 'assets/images/logo.png';
import { reportPostAPI } from 'api/apis/post';

const ContentWrapper = styled.main`
  margin: 48px 0 0;
  height: calc(100vh - 108px);
  overflow-y: auto;
`;

const Container = styled.section`
  display: flex;
  background-color: pink;
  min-height: 100%;
  flex-direction: column;
  justify-content: ${({ data }) => (data.length ? 'flex-start' : 'center')};
  align-items: center;
  padding: 16px;
  gap: 20px;
`;

const Img = styled.img`
  width: 100px;
  filter: grayscale(90%);
`;

const Info = styled.h3`
  font-size: 14px;
  color: var(--sub-text-color);
`;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [postDatas, setPostDatas] = useState([]);
  const [postId, setPostId] = useState(null);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();
  const { scrollRef, scrollToTop } = useScrollToTop();

  const handleReport = async (e) => {
    e.stopPropagation();
    await reportPostAPI(postId);
    closeMenu();
    closeModal();
  };

  return (
    <>
      {isLoading && <Loading />}
      <Header type="main" onClick={scrollToTop} />
      <ContentWrapper ref={scrollRef}>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>
        <Container data={postDatas}>
          {isLoading && (
            <>
              <h3 className="a11y-hidden">내가 팔로우한 사람 글 목록</h3>
              <PostsFeed
                setIsLoading={setIsLoading}
                setPostDatas={setPostDatas}
                postDatas={postDatas}
                openMenu={openMenu}
                setPostId={setPostId}
              />
              {isMenuOpen && (
                <BottomSheetModal setIsMenuOpen={closeMenu}>
                  <BottomSheetContent onClick={openModal}>
                    신고
                  </BottomSheetContent>
                </BottomSheetModal>
              )}
              {isModalOpen && (
                <ConfirmModal
                  title="게시글을 신고하시겠어요?"
                  confirmInfo="신고"
                  setIsMenuOpen={closeMenu}
                  setIsModalOpen={closeModal}
                  onClick={handleReport}
                />
              )}

              {postDatas.length === 0 && (
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
              )}
            </>
          )}
        </Container>
      </ContentWrapper>
      <NavBar />
    </>
  );
}
