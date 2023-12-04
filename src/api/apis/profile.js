import { authInstance } from 'api/instance';

export const profileAPI = async (_id) => {
  try {
    const res = await authInstance.get(`profile/${_id}`);
    const { profile } = res.data;
    return profile;
  } catch (err) {
    console.log(err);
  }
};
