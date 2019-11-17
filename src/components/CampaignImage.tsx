import React from 'react';

interface CampaignImageProps {
  imageLink: string;
}

export const CampaignImage = (props: CampaignImageProps) => {
  return (
    <img
      src={props.imageLink}
      style={{ maxHeight: '800px', maxWidth: '90%' }}
    />
  );
};
