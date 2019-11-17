import React from 'react';
import { getVideoIdFromUrl } from '../utils/getVideoIdFromUrl';

interface YoutubeIframeProps {
  videoLink: string;
}

export const YoutubeIframe = (props: YoutubeIframeProps) => {
  const embededLink = `https://www.youtube.com/embed/${getVideoIdFromUrl(
    props.videoLink
  )}?controls=0`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%'
      }}
    >
      <iframe
        src={embededLink}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        allowFullScreen
        frameBorder="0"
      ></iframe>
    </div>
  );
};
