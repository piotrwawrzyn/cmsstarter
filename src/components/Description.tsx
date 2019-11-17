import React from 'react';

interface DescriptionProps {
  description: string;
}

export const Description = (props: DescriptionProps) => {
  const paragraphs = props.description.split('\n').map((p, i) => (
    <p key={i} style={{ fontSize: '1.5em' }}>
      {p}
    </p>
  ));

  return <div style={{ marginBottom: '2rem' }}>{paragraphs}</div>;
};
