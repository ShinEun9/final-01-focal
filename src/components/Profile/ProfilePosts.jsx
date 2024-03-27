import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostCard } from 'components/Common';
import { BottomSheetModal, BottomSheetContent, ConfirmModal } from 'layouts';
import {
  PostGalleryItem,
  PostNone,
  PostAlignButtons,
} from 'components/Profile';
import { deletePostAPI, reportPostAPI, getUserPostsAPI } from 'api/apis';
import { useModal, useScrollBottom } from 'hooks';

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  border-top: var(--border-color);
`;

const PostAlignWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 0.5px solid var(--border-color);
  border-bottom: 0.5px solid var(--border-color);
`;

const PostGalleryView = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 390px;
  width: 100%;
  height: 100%;
  padding: 16px;
  gap: 8px;
`;

const PostListView = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  padding: 48px 0;
  gap: 65px;
`;

export default function ProfilePosts({
  elementRef,
  postList,
  isUserIsSameWithLoginUser,
}) {
  const navigate = useNavigate();
  const { account_name: accountNameParams } = useParams();
  const accountname = accountNameParams || localStorage.getItem('accountname');

  const [posts, setPosts] = useState(postList);
  const [postId, setPostId] = useState(null);
  const [isListView, setIsListView] = useState(true);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();

  const isBottom = useScrollBottom(elementRef);
  const LIMIT = 4;
  const [skip, setSkip] = useState(0);

  const fetchPosts = async (skip) => {
    const res = await getUserPostsAPI(accountname, skip, LIMIT);
    setPosts((prevData) => [...prevData, ...res]);
  };

  useEffect(() => {
    if (isBottom && posts.length >= LIMIT) {
      fetchPosts(skip + LIMIT);
      setSkip((prevValue) => prevValue + LIMIT);
    }
  }, [isBottom]);

  const handleListAlign = () => {
    setIsListView(true);
  };

  const handleGalleryAlign = () => {
    setIsListView(false);
  };

  const handlePostDelete = async () => {
    await deletePostAPI(postId);
    const res = await getUserPostsAPI(accountname, skip, LIMIT);
    setPosts([...res]);
    closeMenu();
    closeModal();
  };

  const handlePostReport = async () => {
    await reportPostAPI(postId);
    alert('신고되었습니다.');
    closeMenu();
    closeModal();
  };

  return (
    <>
      {posts.length === 0 ? (
        <PostNone accountname={accountname} />
      ) : (
        <PostsContainer>
          <h2 className="a11y-hidden">프로필 포스트</h2>
          <PostAlignWrapper>
            <PostAlignButtons
              isListView={isListView}
              handleListAlign={handleListAlign}
              handleGalleryAlign={handleGalleryAlign}
            />
          </PostAlignWrapper>
          {isListView ? (
            <PostListView>
              {posts.map((post) => (
                <li key={post.createdAt}>
                  <PostCard
                    post={post}
                    setIsMenuOpen={openMenu}
                    setPostId={setPostId}
                  />
                </li>
              ))}
            </PostListView>
          ) : (
            <PostGalleryView>
              {posts.map((post) => (
                <PostGalleryItem
                  key={post.createdAt}
                  img={post.image}
                  _id={post.id}
                />
              ))}
            </PostGalleryView>
          )}
        </PostsContainer>
      )}

      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          {isUserIsSameWithLoginUser ? (
            <>
              <BottomSheetContent onClick={openModal}>삭제</BottomSheetContent>
              <BottomSheetContent
                onClick={() => {
                  navigate(`/post/${postId}/edit`);
                }}
              >
                수정
              </BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={handlePostReport}>
              신고
            </BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="게시글을 삭제할까요?"
          confirmInfo="삭제"
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
          onClick={handlePostDelete}
        />
      )}
    </>
  );
}
