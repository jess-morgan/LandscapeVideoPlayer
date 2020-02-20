export const trackPageview = ({ content = {}, page = {} }) => {
  if (!window.dataLayer) return false;

  window.dataLayer.push({
    event: 'pageview',
    content,
    page
  });
}

export const trackEvent = ({ name, category, action, label }) => {
  if (!window.dataLayer) return false;

  window.dataLayer.push({
    event: name,
    event_info: {
      category,
      action,
      label_1: label,
      label_2: undefined,
    }
  });
}
