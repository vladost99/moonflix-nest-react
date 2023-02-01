import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

const RecommendSlide = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType}></MediaItem>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
