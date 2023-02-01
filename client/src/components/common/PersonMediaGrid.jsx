import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import tmdbConfigs from 'api/configs/tmdb.config';
import { personAPI } from 'api/modules/person.api';
import MediaItem from './MediaItem';
import { toast } from 'react-toastify';

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await personAPI.medias({ personId });

      if (err) toast.error(err.message);
      if (response) {
        const mediaSorted = response.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a));
        setMedias([...mediaSorted]);
        setFilteredMedias([...mediaSorted].splice(0, skip));
      }
    };
    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date = media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date) : new Date(media.first_air_date);

    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...[...medias].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
        {medias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={`grid_item_${index}`}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>

      {filteredMedias.length < medias.length && <Button onClick={onLoadMore}>load more</Button>}
    </>
  );
};

export default PersonMediaGrid;
