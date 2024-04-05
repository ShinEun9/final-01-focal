export default function getIsProductFormValid(itemName, itemPrice, itemImage) {
  return (
    itemName.length < 2 ||
    itemName.length > 15 ||
    !itemPrice ||
    itemPrice <= 0 ||
    !itemImage
  );
}
