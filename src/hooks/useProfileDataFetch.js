import { useEffect, useState } from 'react';
import axios from 'axios';
import { userpostAPI } from 'api/apis/post';
import { getProductListAPI } from 'api/apis/product';
import { getMyInfoAPI } from 'api/apis/user';
import { useParams } from 'react-router-dom';
import { profileAPI } from 'api/apis/profile';

const useProfileDataFetch = () => {
  const { account_name: accountNameParams } = useParams();
  const accountname = accountNameParams || localStorage.getItem('accountname');
  const isUserIsSameWithLoginUser =
    accountname === localStorage.getItem('accountname');

  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});
  const [productList, setProductList] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .all([
        isUserIsSameWithLoginUser ? getMyInfoAPI() : profileAPI(accountname),
        getProductListAPI(accountname),
        userpostAPI(accountname, 0, 4),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          setProfileInfo(res1);
          setProductList(res2);
          setPostList(res3);
        }),
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    profileInfo,
    productList,
    postList,
    isLoading,
    isUserIsSameWithLoginUser,
  };
};

export default useProfileDataFetch;
