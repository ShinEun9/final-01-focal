import React, { useCallback, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { Header, Loading, NavBar } from 'layouts';
import { UserSearchListItem } from 'components/Search';
import { useDebounce } from 'hooks';
import { searchUserAPI } from 'api/apis';

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 108px);
  margin-top: 48px;

  & > section {
    height: 100%;
    display: flex;
    justify-content: ${({ isLoading }) =>
      String(isLoading) === 'true' ? 'center' : 'flex-start'};
    align-items: ${({ isLoading }) =>
      String(isLoading) === 'true' ? 'center' : 'flex-start'};
  }
`;

export default function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedValue = useDebounce(inputValue);

  const getData = useCallback(async () => {
    setIsLoading(true);

    if (inputValue) {
      const { data } = await searchUserAPI(inputValue);
      setUsers(data);
    } else {
      setUsers([]);
    }

    setIsLoading(false);
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
      <Main isLoading={isLoading}>
        <section>
          <h2 className="a11y-hidden">검색 리스트 결과</h2>
          {isLoading && <Loading />}

          {!isLoading && (
            <AutoSizer style={{ height: '100%', width: '100%' }}>
              {({ height }) => (
                <FixedSizeList
                  height={height}
                  itemCount={users.length}
                  itemSize={65}
                  width={'100%'}
                >
                  {({ index, style }) => (
                    <UserSearchListItem
                      key={users[index]._id}
                      user={users[index]}
                      searchQuery={inputValue}
                      style={style}
                    />
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </section>
      </Main>

      <NavBar />
    </>
  );
}
