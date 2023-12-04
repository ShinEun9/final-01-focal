import { atom } from 'recoil';

const pathState = atom({
  key: 'pathState',
  default: '/',
});

export default pathState;
