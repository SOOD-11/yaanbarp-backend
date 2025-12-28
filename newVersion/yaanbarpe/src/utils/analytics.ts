// src/utils/analytics.ts
import ReactGA from 'react-ga4';

export const trackEvent = (
  category: string,
  action: string,
  label?: string
) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};