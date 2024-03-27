import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Header,
  BottomSheetModal,
  BottomSheetContent,
  ConfirmModal,
} from 'layouts';
import { TextInputBox } from 'components/Common';
import { ChatRoom } from 'components/Chat';
import { useModal } from 'hooks';
import { searchUserAPI } from 'api/apis';

export default function ChatRoomPage() {
  const { _id } = useParams();
  const [user, setUser] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const {
    isMenuOpen,
    isModalOpen,
    openMenu,
    closeMenu,
    openModal,
    closeModal,
  } = useModal();
  const navigate = useNavigate();

  const handleButtonClick = (inputValue) => {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, 0);
    const minute = now.getMinutes().toString().padStart(2, 0);

    setMessageList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: inputValue,
        createdAt: `${hour}:${minute}`,
      },
    ]);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await searchUserAPI(_id);
      const findUser = data.find((user) => user.accountname === _id);
      setUser(findUser);
    };

    getUserInfo();
  }, [_id]);

  return (
    <>
      <Header
        type="basic"
        ellipsisBtnShow={true}
        headerText={user?.username}
        onClick={() => openMenu()}
      />
      <h2 className="a11y-hidden">대화창</h2>
      <ChatRoom user={user?.username} messages={messageList} />
      <TextInputBox type="chat" onButtonClick={handleButtonClick} />
      {isMenuOpen && (
        <BottomSheetModal setIsMenuOpen={closeMenu}>
          <BottomSheetContent onClick={() => openModal()}>
            채팅방 나가기
          </BottomSheetContent>
        </BottomSheetModal>
      )}
      {isModalOpen && (
        <ConfirmModal
          title="채팅방을 나가시겠어요?"
          confirmInfo="나가기"
          setIsMenuOpen={closeMenu}
          setIsModalOpen={closeModal}
          onClick={() => navigate('/chat')}
        />
      )}
    </>
  );
}
