import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from 'api/configs/tmdb.config';
import NavigationSwiper from './NavigationSwiper';

const MediaVideo = ({ video }) => {
  const iframe = useRef();

  useEffect(() => {
    const height = (iframe.current.offsetWidth * 9) / 16 + 'px';
    iframe.current.setAttribute('height', height);
  }, []);

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe width="100%" title={video.id} style={{ border: 0 }} key={video.key} src={tmdbConfigs.yutubePath(video.key)} ref={iframe}></iframe>
    </Box>
  );
};

const MediaVideos = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideos;
