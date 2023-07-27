import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TitleHeader from '../layouts/Header/TitleHeader';
import SignUpForm from '../components/SignUp/SignUpForm';
import ProfileForm from '../components/Common/ProfileForm/ProfileForm';
import baseInstance from '../api/instance/baseInstance';
import { getImageSrc } from '../api/apis/image';

const Main = styled.main`
  width: 100%;
  & > section {
    max-width: 322px;
    width: calc(100% - 34px * 2);
    margin: 0 auto;

    & > button {
      display: block;
      margin: 30px auto 0;
    }
  }
`;

export default function SignupPage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    username: '',
    accountname: '',
    intro: '',
    image: '',
  });
  const [showSecondPage, setShowSecondPage] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'image') {
      const { files } = e.target;
      getImageSrc(files[0]).then(({ filename }) => {
        setInputValue({
          ...inputValue,
          image: `${process.env.REACT_APP_BASE_URL}/${filename}`,
        });
      });
    } else {
      setInputValue({ ...inputValue, [id]: value });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await baseInstance.post('/user', { user: inputValue });
      const { status } = res;
      if (status !== 200) throw new Error('네트워크 에러');
      else {
        const {
          data: { message },
        } = res;
        if (message !== '회원가입 성공') throw new Error(message);
        else {
          alert('Welcome to Focal!');
          navigate('/login');
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      {!showSecondPage ? (
        <>
          <TitleHeader>이메일로 회원가입</TitleHeader>
          <Main>
            <section>
              <h2 className="a11y-hidden">이메일, 비밀번호 입력</h2>
              <SignUpForm
                handleClickButton={() => {
                  setShowSecondPage(true);
                }}
                inputValue={inputValue}
                handleChange={handleInputChange}
              />
            </section>
          </Main>
        </>
      ) : (
        <>
          <TitleHeader subText="나중에 언제든지 변경할 수 있습니다.">
            프로필 설정
          </TitleHeader>
          <Main>
            <section>
              <h2 className="a11y-hidden">
                사용자이름, 계정ID, 소개 작성 컨테이너
              </h2>
              <ProfileForm
                type="signup"
                inputValue={inputValue}
                handleChange={handleInputChange}
                handleSubmit={handleSignUpSubmit}
              />
            </section>
          </Main>
        </>
      )}
    </>
  );
}
