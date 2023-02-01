import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import MediaItem from 'components/common/MediaItem';
import Container from 'components/common/Container';
import uiConfigs from 'configs/ui.configs';
import { favouriteAPI } from 'api/modules/favourite.api';
import { removeFavorite } from 'redux/features/user.slice';
import useLogicPagesAndFetch from 'hooks/useLogicPagesAndFetch.hook';

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favouriteAPI.remove({ favoriteId: media._id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media._id);
      toast.success('Remove favorite success');
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton loading={onRequest} onClick={onRemove} fullWidth variant="contained" sx={{ marginTop: 2 }} startIcon={<Delete />}></LoadingButton>
    </>
  );
};

const FavoritesList = () => {
  const {
    count,
    onLoadMore,
    onRemoved,
    values: medias,
    filteredValues: filteredMedias,
  } = useLogicPagesAndFetch({
    api: favouriteAPI.getList,
    skipData: 8,
  });
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={`grid_item_${index}`}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && <Button onClick={onLoadMore}>load more</Button>}
      </Container>
    </Box>
  );
};

export default FavoritesList;
