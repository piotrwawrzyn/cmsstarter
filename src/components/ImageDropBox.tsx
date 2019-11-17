import React from 'react';
import Dropzone from 'react-dropzone';
import { Card, Image } from 'semantic-ui-react';

interface ImageDropBoxProps {
  onDrop: (files: File[]) => void;
  imageUrl: string;
}

export const ImageDropBox = (props: ImageDropBoxProps) => {
  const maximalFileSize = 10485760;

  return (
    <Dropzone
      accept="image/jpeg"
      minSize={0}
      maxSize={maximalFileSize}
      onDrop={props.onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <Card fluid {...getRootProps({ refKey: 'innerref' })} color="black">
          <Image src={props.imageUrl} wrapped ui={false} />
          <input {...getInputProps()} />
        </Card>
      )}
    </Dropzone>
  );
};
