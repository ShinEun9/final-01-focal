import defaultImage from 'assets/images/basic-profile.png';

export default function handleImageError(e) {
  e.target.src = defaultImage;
}
