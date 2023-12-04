import defaultImg from 'assets/images/basic-profile.png';

export default function getProperImgSrc(imageSrc) {
  return imageSrc === 'http://146.56.183.55:5050/Ellipse.png' ||
    imageSrc === null
    ? defaultImg
    : imageSrc;
}
