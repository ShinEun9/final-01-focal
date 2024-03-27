import { authInstance } from 'api/instance';

export const createPostAPI = async (content, image) => {
  try {
    await authInstance.post('/post', {
      post: {
        content,
        image: image.join(),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsAPI = async (limit, skip) => {
  try {
    const res = await authInstance.get(
      `/post/feed/?limit=${limit}&skip=${skip}`,
    );
    const {
      data: { posts },
    } = res;
    return posts;
  } catch (err) {
    console.log(err);
  }
};

export const getPostAPI = async (post_id) => {
  try {
    const res = await authInstance.get(`/post/${post_id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const editPostAPI = async (postId, content, image) => {
  try {
    await authInstance.put(`/post/${postId}`, {
      post: {
        content,
        image: image.join(),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePostAPI = async (postId) => {
  try {
    await authInstance.delete(`/post/${postId}`);
  } catch (error) {
    console.error(error);
  }
};

export const reportPostAPI = async (postId) => {
  try {
    await authInstance.post(`/post/${postId}/report`);
  } catch (error) {
    console.error(error);
  }
};

export const getUserPostsAPI = async (accountname, skip, limit) => {
  try {
    const res = await authInstance.get(
      `/post/${accountname}/userpost/?limit=${limit}&skip=${skip}`,
    );
    const newPosts = res.data.post;
    return newPosts;
  } catch (err) {
    console.log(err);
  }
};
