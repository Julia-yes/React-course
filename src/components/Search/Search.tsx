import styles from './Search.module.scss';
import React from 'react';

type Props = {
  callback(value: string): void;
  props?: string;
};

export class Search extends React.Component<Props, { searchValue: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { searchValue: '' };
  }

  changeSearchValue = (value: string) => {
    this.props.callback(value);
    this.setState({
      searchValue: value,
    });
  };

  componentDidMount() {
    const lastSearch: string | null = localStorage.getItem('search');
    this.setState({
      searchValue: lastSearch ? lastSearch : '',
    });
  }

  componentWillUnmount() {
    localStorage.setItem('search', this.state.searchValue);
  }

  render() {
    return (
      <input
        type='text'
        placeholder='search'
        className={styles.input}
        onChange={(e) => {
          this.changeSearchValue(e.currentTarget.value);
        }}
        value={this.state.searchValue}
      ></input>
    );
  }
}
