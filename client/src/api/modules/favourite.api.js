import privateClient from 'api/client/private.client';

const favouriteEndpoints = {
  list: 'favorites',
  add: 'favorites',
  remove: ({ favoriteId }) => `favorites/${favoriteId}`,
};

export const favouriteAPI = {
  getList: async () => {
    try {
      const response = await privateClient.get(favouriteEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favouriteEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(favouriteEndpoints.remove({ favoriteId }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
};
