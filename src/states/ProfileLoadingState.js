import { atomFamily, selector } from 'recoil';

const loadingIds = ['user', 'product', 'post'];

const loadingStateFamily = atomFamily({
  key: 'loadingState',
  default: true,
});

const profileLoadingState = selector({
  key: 'allLoadingsComplete',
  get: ({ get }) => {
    // 모든 loading 상태가 false인지 확인
    for (let id of loadingIds) {
      const isLoading = get(loadingStateFamily(id));
      if (isLoading) {
        return true;
      }
    }
    return false;
  },
});

export { loadingStateFamily, profileLoadingState };
