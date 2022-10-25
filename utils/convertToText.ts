export default function convertToText(Text: string) {
  return (Text || '').replace(/(<([^>]+)>)/gi, '');
}
