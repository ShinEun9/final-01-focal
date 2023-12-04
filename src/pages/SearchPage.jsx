import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header, Loading, NavBar } from 'layouts';
import { UserSearchListItem } from 'components/Search';
import { useDebounce } from 'hooks';
import { searchUserAPI } from 'api/apis/user';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 108px);
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 48px;
  padding: 20px 16px;

  & > section {
    & > ul li:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const debouncedValue = useDebounce(inputValue);

  const getData = useCallback(async () => {
    if (inputValue) {
      setLoading(true);
      const { data } = await searchUserAPI(inputValue);
      setUsers(data);
      setLoading(false);
    } else {
      setUsers([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    getData();
  }, [debouncedValue]);

  return (
    <>
      <Header
        type="search"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <Main>
          <section>
            <h2 className="a11y-hidden">검색 리스트 결과</h2>
            <ul>
              {users.map((user) => (
                <UserSearchListItem
                  key={user._id}
                  user={user}
                  searchQuery={inputValue}
                />
              ))}
            </ul>
          </section>
        </Main>
      )}

      <NavBar />
    </>
  );
}
