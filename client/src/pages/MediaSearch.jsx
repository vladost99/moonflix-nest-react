import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, TextField, Toolbar, Skeleton, Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { mediaAPI } from 'api/modules/media.api';
import MediaGrid from 'components/common/MediaGrid';
import uiConfigs from 'configs/ui.configs';

const mediaTypes = ['movie', 'tv', 'people'];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);
    const { response, err } = await mediaAPI.search({ mediaType, query, page });
    setOnSearch(false);
    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMedias((m) => [...m, ...response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      search();
    }
  }, [search, query, mediaType]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectCategory) => {
    setMediaType(selectCategory);
  };

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" justifyContent="center" sx={{ width: '100%' }}>
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={`btn_search_${index}`}
                variant={mediaType === item ? 'contained' : 'text'}
                sx={{
                  color: mediaType === item ? 'primary.contrastText' : 'text.primary',
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField color="success" placeholder="Search MoonFlix" sx={{ width: '100%' }} autoFocus onChange={onQueryChange} />

          <MediaGrid mediaType={mediaType} medias={medias} />

          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}

          {onSearch && medias.length === 0 && (
            <Box>
              <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                  <Grid item xs={4} md={4} key={`grid_item_${index}`}>
                    <Skeleton key={`skeleton_search_${index}`} sx={{ bgcolor: 'grey.900' }} variant="rectangular" width="100%" height={218} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
