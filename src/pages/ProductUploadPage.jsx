import React, { useState } from 'react';
import { Header } from 'layouts';
import { ProductUpload } from 'components/Product';
import { postProudctAPI } from 'api/apis';

export default function ProductUploadPage() {
  const [buttonDisable, setButtonDisable] = useState(true);

  const handleValidChange = (isValid) => {
    setButtonDisable(!isValid);
  };

  const handleSubmit = async (productData) => {
    await postProudctAPI(productData);
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
