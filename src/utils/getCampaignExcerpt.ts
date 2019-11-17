export const getCampaignExcerpt = (description: string): string => {
  const firstParagraph = description.split('\n')[0];

  if (firstParagraph.length < 480) return firstParagraph;

  const excerpt = firstParagraph.replace(/^(.{450}[^\s]*).*/, '$1') + '...';

  return excerpt;
};
