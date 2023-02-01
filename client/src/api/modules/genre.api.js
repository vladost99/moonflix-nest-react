import publicClient from 'api/client/public.client';

const genreEndpoints = {
  list: ({ mediaType }) => `media/${mediaType}/genres`,
};

export const genreAPI = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genreEndpoints.list({ mediaType }));

      return { response };
    } catch (err) {
      return { err };
    }
  },
};
