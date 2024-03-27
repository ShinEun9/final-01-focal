import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MyInfoBtns, UserInfoBtns } from 'components/Profile';
import { getProperImgSrc, handleImageError } from 'utils';
import { useRecoilValue } from 'recoil';
import { profileLoadingState } from 'states';

const UserCol = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  width: 100%;
  background-color: var(--white);
  border-bottom: 0.5px solid var(--border-color);
`;

const UserInfoCol = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const UserImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.h2`
  margin: 16px 0 6px;
  font-size: 16px;
  font-weight: 700;
`;

const UserAccount = styled.p`
  font-size: 12px;
  color: var(--sub-text-color);
`;

const UserTitle = styled.h3`
  font-size: 16px;
  color: var(--sub-text-color);
  margin: 16px 0 24px;
`;

const FollowBtn = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  &.follower {
    top: 46px;
    left: -90px;
  }
  &.following {
    top: 46px;
    right: -90px;
  }
`;

const FollowerNumber = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const FollowText = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: var(--sub-text-color);
`;

const FollowingNumber = styled.p`
  color: var(--sub-text-color);
  font-size: 18px;
  font-weight: 700;
`;

export default function ProfileInfo({ userInfo }) {
  const isProfileLoading = useRecoilValue(profileLoadingState);
  const {
    _id,
    username,
    accountname,
    intro,
    image,
    isfollow,
    followerCount,
    followingCount,
  } = userInfo;

  const [followerNum, setFollowerNum] = useState(followerCount);
  const useraccount = localStorage.getItem('accountname');
  const navigate = useNavigate();

  const handleFollowNum = (isfollow) => {
    isfollow
      ? setFollowerNum(followerNum - 1)
      : setFollowerNum(followerNum + 1);
  };

  if (isProfileLoading) return;
  return (
    <UserCol>
      <h2 className="a11y-hidden">프로필 정보</h2>
      <UserInfoCol>
        <UserImage
          src={getProperImgSrc(image)}
          onError={handleImageError}
          alt="프로필 이미지"
        />
        <UserName>{username}</UserName>
        <UserAccount>@ {accountname}</UserAccount>
        <UserTitle>{intro}</UserTitle>
        <FollowBtn
          onClick={() => {
            navigate(`/follow/${_id}/follower`, {
              state: {
                accountname: accountname,
                username: username,
              },
            });
          }}
          className="follower"
        >
          <FollowerNumber>{followerNum}</FollowerNumber>
          <FollowText>followers</FollowText>
        </FollowBtn>
        <FollowBtn
          onClick={() => {
            navigate(`/follow/${_id}/following`, {
              state: {
                accountname: accountname,
                username: username,
              },
            });
          }}
          className="following"
        >
          <FollowingNumber>{followingCount}</FollowingNumber>
          <FollowText>followings</FollowText>
        </FollowBtn>
      </UserInfoCol>
      {useraccount !== accountname ? (
        <UserInfoBtns
          handleFollowNum={handleFollowNum}
          isfollow={isfollow}
          accountname={accountname}
        />
      ) : (
        <MyInfoBtns />
      )}
    </UserCol>
  );
}
