import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import tmdbConfigs from 'api/configs/tmdb.config';
import { reviewAPI } from 'api/modules/review.api';
import Container from 'components/common/Container';
import uiConfigs from 'configs/ui.configs';
import DeleteIcon from '@mui/icons-material/Delete';
import { routesGen } from 'routes/routes';
import useLogicPagesAndFetch from 'hooks/useLogicPagesAndFetch.hook';

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await reviewAPI.remove({ reviewId: review._id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      onRemoved(review._id);
      toast.success('Remove review success');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        '&:hover': { backgroundColor: 'background.paper' },
      }}
    >
      <Box sx={{ width: { xs: 0, md: '10%' } }}>
        <Link to={routesGen.mediaDetail(review.mediaType, review.mediaid)} style={{ color: 'unset', textDecoration: 'none' }}>
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(review.mediaPoster)),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' },
        }}
      >
        <Stack spacing={1}>
          <Link to={routesGen.mediaDetail(review.mediaType, review.mediaId)} style={{ color: 'unset', textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">{dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          right: { xs: 0, md: '10px' },
          marginTop: { xs: 2, md: 0 },
          width: 'max-content',
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const {
    onLoadMore,
    onRemoved,
    count,
    values: reviews,
    filteredValues: filteredReviews,
  } = useLogicPagesAndFetch({
    api: reviewAPI.getList,
    skipData: 2,
  });
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item._id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && <Button onClick={onLoadMore}>load more</Button>}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
