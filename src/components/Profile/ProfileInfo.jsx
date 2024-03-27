import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { MyInfoBtns, UserInfoBtns } from 'components/Profile';
import { getProperImgSrc, handleImageError } from 'utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loadingStateFamily, profileLoadingState } from 'states';
import { getMyInfoAPI } from 'api/apis/user';
import { profileAPI } from 'api/apis/profile';

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

export default function ProfileInfo() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [followerCountStatus, setFollowerCountStatus] = useState(0);

  const isProfileLoading = useRecoilValue(profileLoadingState);
  const setIsUserLoading = useSetRecoilState(loadingStateFamily('user'));

  const { account_name: accountNameParams } = useParams();
  const accountname = accountNameParams || localStorage.getItem('accountname');
  const isUserIsSameWithLoginUser =
    accountname === localStorage.getItem('accountname');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isUserIsSameWithLoginUser) {
        const data = await getMyInfoAPI();
        setProfileData(data);
        setFollowerCountStatus(data.followerCount);
        setIsUserLoading(false);
      } else {
        const data = await profileAPI(accountname);
        setProfileData(data);

        setFollowerCountStatus(data.followerCount);
        setIsUserLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleFollowNum = (isfollow) => {
    isfollow
      ? setFollowerCountStatus((prev) => prev - 1)
      : setFollowerCountStatus((prev) => prev + 1);
  };

  if (isProfileLoading) return;
  return (
    <UserCol>
      <h2 className="a11y-hidden">프로필 정보</h2>
      <UserInfoCol>
        <UserImage
          src={getProperImgSrc(profileData.image)}
          onError={handleImageError}
          alt="프로필 이미지"
        />
        <UserName>{profileData.username}</UserName>
        <UserAccount>@ {accountname}</UserAccount>
        <UserTitle>{profileData.intro}</UserTitle>
        <FollowBtn
          onClick={() => {
            navigate(`/follow/${profileData._id}/follower`, {
              state: {
                accountname,
                username: profileData.username,
              },
            });
          }}
          className="follower"
        >
          <FollowerNumber>{followerCountStatus}</FollowerNumber>
          <FollowText>followers</FollowText>
        </FollowBtn>
        <FollowBtn
          onClick={() => {
            navigate(`/follow/${profileData._id}/following`, {
              state: {
                accountname,
                username: profileData.username,
              },
            });
          }}
          className="following"
        >
          <FollowingNumber>{profileData.followingCount}</FollowingNumber>
          <FollowText>followings</FollowText>
        </FollowBtn>
      </UserInfoCol>
      {isUserIsSameWithLoginUser ? (
        <MyInfoBtns />
      ) : (
        <UserInfoBtns
          handleFollowNum={handleFollowNum}
          isfollow={profileData.isfollow}
          accountname={accountname}
        />
      )}
    </UserCol>
  );
}
