import React, { useState } from 'react';
import { Header } from 'layouts';
import { ProductUpload } from 'components/Product';
import { getIsProductFormValid } from 'utils';

export default function ProductUploadPage() {
  const [inputValue, setInputValue] = useState({
    itemImage: null,
    itemType: '필름',
    itemName: '',
    itemPrice: null,
  });
  const { itemImage, itemName, itemPrice } = inputValue;

  const btnDisabled = getIsProductFormValid(itemName, itemImage, itemPrice);

  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        btnDisabled={btnDisabled}
      />
      <ProductUpload inputValue={inputValue} setInputValue={setInputValue} />
    </>
  );
}
