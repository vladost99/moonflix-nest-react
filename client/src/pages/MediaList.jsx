import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import tmdbConfigs from 'api/configs/tmdb.config';
import { mediaAPI } from 'api/modules/media.api';
import uiConfigs from 'configs/ui.configs';
import usePreviousHook from 'hooks/use-previous.hook';
import HeroSlide from 'components/common/HeroSlide';
import MediaGrid from 'components/common/MediaGrid';
import { setAppState } from 'redux/features/app-state.slice';
import { setGlobalLoading } from 'redux/features/global-loading.slice';
import { toast } from 'react-toastify';

const MediaList = () => {
  const { mediaType } = useParams();
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const prevMediaType = usePreviousHook(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ['popular', 'top_rated'], []);
  const category = ['popular', 'top rated'];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaAPI.getList({ mediaType, mediaCategory: mediaCategories[currCategory], page: currPage });
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrPage(1);
      setCurrCategory(0);
    }

    getMedias();
  }, [mediaType, currCategory, prevMediaType, currPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;

    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currCategory]} />
      <Box {...uiConfigs.style.mainContent}>
        <Stack sx={{ marginBottom: 4 }} justifyContent="space-between" spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="center">
          <Typography variant="h5" fontWeight="700">
            {mediaType === tmdbConfigs.mediaType.movie ? 'Movies' : 'TV Series'}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((item, index) => (
              <Button
                onClick={() => onCategoryChange(index)}
                sx={{ color: currCategory === index ? 'primary.contrastText' : 'text.primary' }}
                key={`cateogry_${index}`}
                size="large"
                variant={currCategory === index ? 'contained' : 'text'}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />

        <LoadingButton
          sx={{
            marginTop: 8,
          }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
