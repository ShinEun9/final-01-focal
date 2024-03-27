import React, { useEffect, useState } from 'react';
import { NoFeed } from '.';
import { PostCard } from 'components/Common';
import {
  BottomSheetContent,
  BottomSheetModal,
  ConfirmModal,
  Loading,
} from 'layouts';
import { useModal } from 'hooks';
import { getPostsAPI, reportPostAPI } from 'api/apis';

export default function PostsFeed({ postData, setPostData }) {
  // * 무한스크롤
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const LIMIT = 5;

  const getPosts = async () => {
    try {
      const newPosts = await getPostsAPI(LIMIT, page * LIMIT);

      setPostData((prev) => ({
        ...prev,
        posts: [...prev.posts, ...newPosts],
      }));

      setIsLast(newPosts.length < LIMIT);
    } catch (error) {
      console.error(error);
    } finally {
      setPostData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    !isLast && getPosts();
  }, [page]);

  useEffect(() => {
    return () => {
      setPostData({ isLoading: true, posts: [] });
      setPage(0);
      setIsLast(false);
    };
  }, []);

  // * 모달 관련
  const [postId, setPostId] = useState();
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();

  const handleReport = async (e) => {
    e.stopPropagation();
    await reportPostAPI(postId);
    closeMenu();
    closeModal();
  };

  if (postData.isLoading) {
    return <Loading />;
  }
  if (postData.posts.length === 0) {
    return <NoFeed />;
  }

  return (
    <>
      {postData.posts.map((item, index) => (
        <PostCard
          key={item.id}
          post={item}
          setIsMenuOpen={openMenu}
          setPostId={setPostId}
          isLastItem={postData.posts.length - 1 === index}
          onFetchMoreData={() => setPage((prev) => prev + 1)}
        />
      ))}

      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          <BottomSheetContent onClick={openModal}>신고</BottomSheetContent>
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
    </>
  );
}
