import React from 'react';
import { Dropdown, DropdownProps, Header, Icon } from 'semantic-ui-react';

interface FilterDropdownProps {
  onChange: (e: React.SyntheticEvent, value: DropdownProps) => void;
}

export enum FilterOptions {
  ALL,
  ONLY_APPROVED,
  ONLY_UNAPPROVED,
  ONLY_DENIED
}

export const FilterDropdown = (props: FilterDropdownProps) => {
  const options: {
    key: FilterOptions;
    text: string;
    value: FilterOptions;
  }[] = [
    {
      key: FilterOptions.ALL,
      text: 'all campaigns',
      value: FilterOptions.ALL
    },
    {
      key: FilterOptions.ONLY_APPROVED,
      text: 'only approved campaigns',
      value: FilterOptions.ONLY_APPROVED
    },
    {
      key: FilterOptions.ONLY_UNAPPROVED,
      text: 'only unapproved campaigns',
      value: FilterOptions.ONLY_UNAPPROVED
    },
    {
      key: FilterOptions.ONLY_DENIED,
      text: 'only denied campaigns',
      value: FilterOptions.ONLY_DENIED
    }
  ];

  return (
    // <Dropdown
    //   onChange={props.onChange}
    //   options={options}
    //   fluid
    //   selection
    //   defaultValue={FilterOptions.ALL}
    //   style={{ marginBottom: '1rem' }}
    // />
    <Header as="h4">
      <Icon name="filter" />
      <Header.Content>
        Show{' '}
        <Dropdown
          inline
          onChange={props.onChange}
          defaultValue={FilterOptions.ALL}
          options={options}
          style={{ color: '#21ba45' }}
        />
      </Header.Content>
    </Header>
  );
};
