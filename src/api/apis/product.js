import { authInstance } from 'api/instance';

export const getProductsAPI = async (accountname) => {
  try {
    const response = await authInstance.get(`/product/${accountname}`);

    return response.data.product;
  } catch (error) {
    console.log(error);
  }
};

export const getProductAPI = async (productId) => {
  try {
    const response = await authInstance.get(`/product/detail/${productId}`);

    return response.data.product;
  } catch (error) {
    console.log(error);
  }
};

export const postProudctAPI = async (productData) => {
  try {
    const response = await authInstance.post('/product', productData);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const editProductAPI = async (productId, productData) => {
  try {
    const response = await authInstance.put(
      `/product/${productId}`,
      productData,
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductAPI = async (productId) => {
  try {
    await authInstance.delete(`/product/${productId}`);
  } catch (error) {
    console.log(error);
  }
};
