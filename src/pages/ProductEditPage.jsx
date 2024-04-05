import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from 'layouts';
import { ProductUpload } from 'components/Product';
import { getProductAPI } from 'api/apis';
import { getIsProductFormValid } from 'utils';

export default function ProductEditPage() {
  const { product_id } = useParams();
  const [inputValue, setInputValue] = useState({
    itemImage: null,
    itemType: '필름',
    itemName: '',
    itemPrice: null,
  });
  const { itemImage, itemName, itemPrice } = inputValue;

  const btnDisabled = getIsProductFormValid(itemName, itemImage, itemPrice);

  useEffect(() => {
    const getData = async () => {
      const product = await getProductAPI(product_id);
      const { itemImage, link, itemName, price } = product;
      setInputValue({
        itemImage,
        itemName,
        itemType: link,
        itemPrice: price,
      });
    };
    getData();
  }, []);

  return (
    <>
      <Header
        type="upload"
        buttonId="product"
        buttonText="저장"
        btnDisabled={btnDisabled}
      />
      <ProductUpload
        isEditMode={true}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  );
}
