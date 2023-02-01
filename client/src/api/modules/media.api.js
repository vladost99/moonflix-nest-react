import privateClient from 'api/client/private.client';
import publicClient from 'api/client/public.client';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `media/${mediaType}/${mediaCategory}?page=${page}`,

  detail: ({ mediaType, mediaId }) => `media/${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `media/${mediaType}/search?query=${query}&page=${page}`,
};

export const mediaAPI = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.list({ mediaType, mediaCategory, page }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(mediaEndpoints.detail({ mediaType, mediaId }));

      return { response };
    } catch (err) {
      return { err };
    }
  },

  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.search({ mediaType, query, page }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
};
