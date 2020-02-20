import React, { useState } from "react";

const AppContext = React.createContext();

const galleries = window.__GALLERY_DATA__ || [];
const env = window.__ENVIRONMENT__ || {};
const cultureNames = galleries.map(g => g.cultureName);

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    env,
    galleries,
    cultureNames,
    currentCultureName: "English",
    drawerOpen: false,
    viewerExpanded: false,
    showControls: false,
    currentSlide: undefined,
    instance: {},
    canZoomIn: true,
    canZoomOut: false,
    isFirstLoad: true,
    isTransitioningHome: false,
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
