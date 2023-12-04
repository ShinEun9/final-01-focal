import React, { useState } from 'react';
import { Header } from 'layouts';
import { ProductUpload } from 'components/Product';
import { createProductAPI } from 'api/apis/product';

export default function ProductUploadPage() {
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleValidChange = (isValid) => {
    setButtonDisable(!isValid);
  };

  const handleSubmit = async (productData) => {
    await createProductAPI(productData);
  };

  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        btnDisabled={buttonDisable}
      />
      <ProductUpload
        onValidChange={handleValidChange}
        handleSubmit={handleSubmit}
        inputValue={{}}
        setInputValue={() => {}}
      />
    </>
  );
}
