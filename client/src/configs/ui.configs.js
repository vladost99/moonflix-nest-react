const uiConfigs = {
  style: {
    gradiendBgImage: {
      dark: {
        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
      },
      light: {
        backgroundImage: 'linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))',
      },
    },
    horizontalGradiendBgImage: {
      dark: {
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))',
      },
      light: {
        backgroundImage: 'linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))',
      },
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || 'justify',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: lines,
    }),
    mainContent: {
      maxWidth: '1366px',
      margin: 'auto',
      padding: 2,
    },
    backgroundImage: (imgPath) => ({
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'darkgrey',
      backgroundImage: `url(${imgPath})`,
    }),
  },
  size: {
    sidebarWith: '300px',
    contentMaxWith: '1366px',
  },
};

export default uiConfigs;
