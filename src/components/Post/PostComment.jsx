import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moreBtn from 'assets/icons/icon-more.svg';
import { ConfirmModal, BottomSheetContent, BottomSheetModal } from 'layouts';
import { useModal } from 'hooks';
import { deleteCommentAPI, reportCommentAPI } from 'api/apis';
import { convertTime, getProperImgSrc, handleImageError } from 'utils';

const CommentSection = styled.section`
  max-width: 390px;
  padding: 20px 16px 0;
  margin: 0 auto;
`;

const CommentItem = styled.li`
  margin-bottom: 16px;
  position: relative;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const ProfileLink = styled(Link)`
  margin-right: 12px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0.5px solid var(--border-color);
`;

const NameLink = styled(Link)`
  margin: 6px 6px 0 0;
`;

const UserName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
`;

const CommentDate = styled.span`
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  color: var(--sub-txt-color);
  margin-top: 8.5px;

  &::before {
    content: '·';
    margin-right: 4px;
  }
`;

const CommentText = styled.p`
  padding-left: 48px;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

const MoreBtn = styled.button`
  content: '';
  position: absolute;
  top: 5px;
  right: 0;
  width: 20px;
  height: 20px;
  background-image: url(${moreBtn});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default function PostComment({ comments, postId, onDelete }) {
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const [author, setAuthor] = useState('');
  const [commentId, setCommentId] = useState('');
  const accountName = localStorage.getItem('accountname');

  const handleDeleteButton = async () => {
    await deleteCommentAPI(postId, commentId);
    closeMenu();
    closeModal();
    onDelete(commentId);
  };

  const handleReportButton = async () => {
    await reportCommentAPI(postId, commentId);
    closeMenu();
    closeModal();
  };

  return (
    <CommentSection>
      <h2 className="a11y-hidden">댓글목록</h2>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentInfo>
              <ProfileLink to={`/profile/${comment.author.accountname}`}>
                <ProfileImage
                  src={getProperImgSrc(comment.author.image)}
                  onError={handleImageError}
                  alt="사용자이미지"
                />
              </ProfileLink>
              <NameLink to={`/profile/${comment.author.accountname}`}>
                <UserName>{comment.author.username}</UserName>
              </NameLink>
              <CommentDate>{convertTime(comment.createdAt)}</CommentDate>
            </CommentInfo>
            <CommentText>{comment.content}</CommentText>
            <MoreBtn
              onClick={() => {
                openMenu();
                setAuthor(comment.author.accountname);
                setCommentId(comment.id);
              }}
            />
          </CommentItem>
        ))}
      </ul>
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          {author === accountName ? (
            <>
              <BottomSheetContent
                onClick={() => {
                  openModal();
                }}
              >
                삭제
              </BottomSheetContent>
            </>
          ) : (
            <BottomSheetContent onClick={() => openModal()}>
              신고
            </BottomSheetContent>
          )}
        </BottomSheetModal>
      )}
      {isModalOpen ? (
        author === accountName ? (
          <ConfirmModal
            title="댓글을 삭제하시겠어요?"
            confirmInfo="삭제"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleDeleteButton}
          />
        ) : (
          <ConfirmModal
            title="신고하시겠어요?"
            confirmInfo="신고"
            setIsMenuOpen={closeMenu}
            setIsModalOpen={closeModal}
            onClick={handleReportButton}
          />
        )
      ) : null}
    </CommentSection>
  );
}
