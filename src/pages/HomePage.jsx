import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, NavBar } from 'layouts';
import { PostsFeed } from 'components/Post';
import { useScrollToTop } from 'hooks';

const Main = styled.main`
  margin: 48px 0 0;
  height: calc(100dvh - 108px);
  overflow-y: auto;
`;

const Section = styled.section`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: ${({ data }) => (data.length ? 'flex-start' : 'center')};
  align-items: center;
  padding: 16px;
  gap: 20px;
`;

export default function HomePage() {
  const [postData, setPostData] = useState({ posts: [], isLoading: true });

  const { scrollRef: mainRef, scrollToTop } = useScrollToTop();

  return (
    <>
      <Header type="main" onClick={scrollToTop} />
      <Main ref={mainRef}>
        <h2 className="a11y-hidden">Focal 홈 피드</h2>
        <Section data={postData.posts}>
          <h3 className="a11y-hidden">내가 팔로우한 사람 글 목록</h3>
          <PostsFeed postData={postData} setPostData={setPostData} />
        </Section>
      </Main>

      <NavBar />
    </>
  );
}
