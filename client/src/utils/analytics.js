import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-B2VVGXHYR3"); // Substitua pelo seu ID do Google Analytics
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
