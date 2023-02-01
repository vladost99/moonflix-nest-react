import { Favorite, PlayArrow, FavoriteBorderOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircularRate from 'components/common/CircularRate';
import Container from 'components/common/Container';
import ImageHeader from 'components/common/ImageHeader';
import uiConfigs from 'configs/ui.configs';
import tmdbConfigs from 'api/configs/tmdb.config';
import { mediaAPI } from 'api/modules/media.api';
import { favouriteAPI } from 'api/modules/favourite.api';
import { setGlobalLoading } from 'redux/features/global-loading.slice';
import CastSlide from 'components/common/CastSlide';
import { setAuthModalOpen } from 'redux/features/auth-modal.slice';
import { addFavorite, removeFavorite, userSelector } from 'redux/features/user.slice';
import MediaVideos from 'components/common/MediaVideosSlide';
import BackdropSlide from 'components/common/BackdropSlide';
import PosterSlide from 'components/common/PosterSlide';
import RecommendSlide from 'components/common/RecommendSlide';
import MediaSlide from 'components/common/MediaSlide';
import MediaReview from 'components/common/MediaReview';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector(userSelector);
  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaAPI.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setGenres(response.genres.splice(0, 2));
        setIsFavorite(response.isFavorite);
      }
      if (err) {
        toast.error(err.message);
      }
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) {
      return dispatch(setAuthModalOpen(true));
    }

    if (onRequest) return;

    if (isFavorite) {
      await onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId,
      mediaTitle: media.title || media.name,
      mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await favouriteAPI.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Add favorite success');
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const favorite = listFavorites.find((e) => e.mediaId.toString() === mediaId);

    const { response, err } = await favouriteAPI.remove({ favoriteId: favorite._id });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Remove favorite success');
    }
  };

  return media ? (
    <>
      <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
      <Box
        sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)),
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                color: 'text.primary',
              }}
            >
              <Stack spacing={5}>
                <Typography variant="h4" fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }} fontWeight="700" sx={{ ...uiConfigs.style.typoLines(2, 'left') }}>
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split('-')[0] : media.first_air_date.split('-')[0]
                  }`}
                </Typography>

                <Stack alignItems="center" direction="row" spacing={1}>
                  <CircularRate value={media.vote_average} />
                  <Divider orientation="vertical" />
                  {genres.map((genre, index) => (
                    <Chip key={`genre_${index}`} label={genre.name} variant="filled" color="primary" />
                  ))}
                </Stack>

                <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(5) }}>
                  {media.overview}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: 'max-content',
                      '& . MuiButton-starIcon': { marginRight: '0' },
                    }}
                    size="large"
                    startIcon={isFavorite ? <Favorite /> : <FavoriteBorderOutlined />}
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    onClick={() => videoRef.current.scrollIntoView()}
                    size="large"
                    startIcon={<PlayArrow />}
                    variant="contained"
                    sx={{ width: 'max-content' }}
                  >
                    watch now
                  </Button>
                </Stack>

                <Container header="Cast">
                  <CastSlide casts={media.credits.cast} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header="Videos">
            <MediaVideos videos={media.videos.results.splice(0, 5)} />
          </Container>
        </div>

        {media.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}

        {media.images.posters.length > 0 && (
          <Container headers="posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}

        <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />

        <Container header="you may also like">
          {media.recommend.results.length > 0 && <RecommendSlide medias={media.recommend.results} mediaType={mediaType} />}
          {media.recommend.results.length === 0 && <MediaSlide mediaType={mediaType} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />}
        </Container>
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
