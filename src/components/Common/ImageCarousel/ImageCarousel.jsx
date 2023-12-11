import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

const ImageCarouselUl = styled.ul`
  display: flex;
  transition: transform 0.3s ease;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};

  li {
    flex: 0 0 100%;
  }
`;

const CarouselButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;

  & > button {
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--sub-text-color);

    &[data-active='true'] {
      background-color: var(--main-color);
    }

    &:hover {
      background-color: var(--light-gray);
    }
  }
`;

const ImageCarousel = ({ image, postId }) => {
  const imageList = useMemo(() => image.split(','), [image]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCarouselButtonClick = (e, index) => {
    e.stopPropagation();
    setCurrentSlide(index);
  };

  return (
    <>
      <ImageCarouselUl currentSlide={currentSlide}>
        {image &&
          imageList.map((image, index) => {
            return (
              <li key={postId + index}>
                <img src={image} alt={`이미지 ${index + 1}`} />
              </li>
            );
          })}
      </ImageCarouselUl>
      {imageList.length > 1 && (
        <CarouselButtonWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {imageList.map((_, index) => (
            <button
              type="button"
              key={index}
              data-active={index === currentSlide ? 'true' : 'false'}
              onClick={(e) => {
                handleCarouselButtonClick(e, index);
              }}
              aria-label={`이미지 ${index + 1}`}
            />
          ))}
        </CarouselButtonWrapper>
      )}
    </>
  );
};

export default ImageCarousel;
