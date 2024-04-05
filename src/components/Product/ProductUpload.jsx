import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TextInput, RadioInput, RadioInputGroup } from 'components/Common';
import { ProductImageUpload } from 'components/Product';
import { editProductAPI, getImageSrcAPI, postProudctAPI } from 'api/apis';
import { getFormattedPrice } from 'utils';

const ProductMainStyle = styled.main`
  margin-top: 48px;
  display: flex;
  justify-content: center;
  min-width: 390px;
  width: 100%;
  height: 100%;
  background-color: var(--white);
`;

const ProductSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  width: 100%;
  padding: 30px 34px 0px;
`;

const ProductFormStyle = styled.form`
  width: 100%;
  & > div:not(:first-child) {
    margin-bottom: 16px;
  }
`;

const ITEM_TYPE = ['필름', '카메라'];

export default function ProductUpload({
  inputValue,
  setInputValue,
  isEditMode = false,
}) {
  const navigate = useNavigate();
  const { product_id: productId } = useParams();

  const { itemImage, itemType, itemName, itemPrice } = inputValue;

  const imagePreview = useMemo(() => {
    if (!itemImage) return null;
    else if (typeof itemImage === 'string') return itemImage;
    else return URL.createObjectURL(itemImage);
  }, [itemImage]);

  const displayPrice = useMemo(() => getFormattedPrice(itemPrice), [itemPrice]);

  const handleInputChange = (e) => {
    const { id } = e.target;
    if (id === 'itemImage') {
      const file = e.target.files[0];
      setInputValue((prev) => ({ ...prev, itemImage: file }));
      return;
    }

    let { value } = e.target;
    if (id === 'itemPrice') {
      value = parseInt(value.replace(/,/g, ''));
      setInputValue((prev) => ({ ...prev, [id]: value }));
    } else if (id === 'itemName') {
      setInputValue((prev) => ({ ...prev, [id]: value }));
    } else {
      const { name } = e.target;
      setInputValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSubmit = async () => {
    const { filename } = await getImageSrcAPI(itemImage);
    const image = `${process.env.REACT_APP_BASE_URL}${filename}`;

    return image;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let image;
    if (itemImage instanceof File) {
      image = await handleImageSubmit();
    }

    const productData = {
      product: {
        itemName,
        price: itemPrice,
        link: itemType,
        itemImage: image,
      },
    };

    if (isEditMode) {
      await editProductAPI(productId, productData);
    } else {
      await postProudctAPI(productData);
    }

    navigate('/profile');
  };

  return (
    <ProductMainStyle>
      <ProductSectionStyle>
        <ProductFormStyle id="product" onSubmit={handleFormSubmit}>
          <ProductImageUpload
            title="이미지 등록"
            onImageChange={handleInputChange}
            imagePreview={imagePreview}
          />
          <RadioInputGroup title={'상품종류'}>
            {ITEM_TYPE.map((item) => (
              <RadioInput
                key={item}
                name={'itemType'}
                id={item}
                value={item}
                onChange={handleInputChange}
                checked={item === itemType}
              >
                {item}
              </RadioInput>
            ))}
          </RadioInputGroup>
          <TextInput
            id="itemName"
            type="text"
            placeholder="2~15자 이내여야 합니다."
            value={itemName}
            onChange={handleInputChange}
          >
            상품명
          </TextInput>
          <TextInput
            id="itemPrice"
            type="text"
            placeholder="숫자만 입력 가능합니다."
            value={displayPrice}
            onChange={handleInputChange}
          >
            가격
          </TextInput>
        </ProductFormStyle>
      </ProductSectionStyle>
    </ProductMainStyle>
  );
}
