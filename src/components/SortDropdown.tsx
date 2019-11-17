import React from 'react';
import { Dropdown, DropdownProps, Header, Icon } from 'semantic-ui-react';

interface SortDropdownProps {
  onChange: (e: React.SyntheticEvent, value: DropdownProps) => void;
}

export enum SortOptions {
  CLOSEST_END,
  NEW,
  MOST_FUNDED,
  MOST_RAISED
}

export const SortDropdown = (props: SortDropdownProps) => {
  const options: {
    key: SortOptions;
    text: string;
    value: SortOptions;
  }[] = [
    {
      key: SortOptions.CLOSEST_END,
      text: 'end date',
      value: SortOptions.CLOSEST_END
    },
    {
      key: SortOptions.NEW,
      text: 'newest',
      value: SortOptions.NEW
    },
    {
      key: SortOptions.MOST_FUNDED,
      text: 'most % funded',
      value: SortOptions.MOST_FUNDED
    },
    {
      key: SortOptions.MOST_RAISED,
      text: 'most $ raised',
      value: SortOptions.MOST_RAISED
    }
  ];

  return (
    <Header as="h4">
      <Icon name="sort amount up" />
      <Header.Content>
        Sort by{' '}
        <Dropdown
          inline
          onChange={props.onChange}
          defaultValue={SortOptions.CLOSEST_END}
          options={options}
          style={{ color: '#21ba45' }}
        />
      </Header.Content>
    </Header>
  );
};
