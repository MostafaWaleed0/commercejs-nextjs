export default function convertToSlug(Text: string) {
  return (Text || '')
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
