import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import styled from 'styled-components';
import { UserInfo, ImageCarousel, MoreButton } from 'components/Common';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-message-small.svg';
import { convertTime } from 'utils';
import { likeAPI } from 'api/apis/like';

const PostArticle = styled.article`
  position: relative;
  width: 358px;

  & > button {
    position: absolute;
    top: ${({ isInProfile }) => (isInProfile ? '-40px' : '0px')};
    right: 0px;
  }
`;

const PostContentSection = styled.section`
  margin: ${({ isInProfile }) => (isInProfile ? '0 0 12px 0' : '12px 0')};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  p {
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 12px;
    word-break: break-all;

    .post-preview {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }

  img {
    vertical-align: top;
    width: 100%;
    aspect-ratio: 304/228;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ContentInfoSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  time {
    font-size: 10px;
    color: var(--sub-text-color);
  }
`;

const InfoButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > button {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const StyledHeartIcon = styled(HeartIcon)`
  stroke: ${({ $liked }) =>
    $liked ? 'var(--main-color)' : 'var(--sub-text-color)'};
  fill: ${({ $liked }) => ($liked ? 'var(--main-color)' : 'transparent')};
`;

export default function PostCard({
  post,
  setPostId,
  setIsMenuOpen,
  isLastItem,
  onFetchMoreData,
}) {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMoreData();
  }, [isLastItem, isIntersecting]);

  const navigate = useNavigate();
  const isInProfile = useMemo(
    () => location.pathname.includes('profile'),
    [location.pathname],
  );
  const { post_id: postIdParams } = useParams();

  const {
    id,
    author,
    content,
    image,
    hearted,
    heartCount,
    commentCount,
    createdAt,
  } = post;

  const [likeInfo, setLikeInfo] = useState({
    liked: hearted,
    count: heartCount,
  });

  const handleLike = async () => {
    const { liked, count } = await likeAPI(id, likeInfo.liked);
    setLikeInfo({
      liked: liked,
      count: count,
    });
  };

  const handleMenu = () => {
    setIsMenuOpen(true);
    setPostId(id);
  };

  return (
    <PostArticle isInProfile={isInProfile} ref={ref}>
      <h3 className="a11y-hidden">포스트</h3>

      {!isInProfile && <UserInfo user={author} />}
      {<MoreButton onClick={handleMenu}>더보기버튼</MoreButton>}

      <PostContentSection
        onClick={() => {
          navigate(`/post/${id}`);
        }}
        isInProfile={isInProfile}
      >
        <h4 className="a11y-hidden">포스트 내용</h4>
        <p className={postIdParams ? '' : 'post-preview'}>{content}</p>
        <ImageCarousel image={image} postId={id} />
      </PostContentSection>
      <ContentInfoSection>
        <h4 className="a11y-hidden"> 좋아요 갯수, 댓글 갯수 및 게시글 날짜</h4>
        <InfoButtonWrapper>
          <button className={'button'} type="button" onClick={handleLike}>
            <span className="a11y-hidden">좋아요 버튼</span>
            <StyledHeartIcon onClick={handleLike} $liked={likeInfo.liked} />
            <span className="contents">{likeInfo.count}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(`/post/${id}`);
            }}
          >
            <span className="a11y-hidden">상세 글 정보보기 버튼</span>
            <CommentIcon fill="white" stroke="var(--sub-text-color)" />
            <span className="contents">{commentCount}</span>
          </button>
        </InfoButtonWrapper>
        <time dateTime={createdAt}>{convertTime(createdAt)}</time>
      </ContentInfoSection>
    </PostArticle>
  );
}
