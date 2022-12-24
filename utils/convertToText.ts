export const convertToText = (Text: string) => {
  return (Text || '').replace(/(<([^>]+)>)/gi, '');
};
