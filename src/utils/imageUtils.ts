/**
 * Converts a Google Drive sharing URL to a direct image URL
 * @param url The Google Drive sharing URL
 * @returns The direct image URL or the original URL if not a Google Drive URL
 */
export const getGoogleDriveImageUrl = (url: string): string => {
  if (!url.includes('drive.google.com')) return url;
  
  const fileId = url.match(/\/d\/(.*?)\/view/)?.[1];
  if (!fileId) return url;
  
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}; 