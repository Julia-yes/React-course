import React from 'react';
import { Card } from 'components/Card/Card';
import { Search } from 'components/Search/Search';
import styles from './Main.module.scss';
import { Users } from '../../data/data';

type Props = {
  props?: string;
};

export class Main extends React.Component<Props, { searchValue: string }> {
  constructor(props: Props) {
    super(props);
    this.state = { searchValue: '' };
    this.changeSearchValue = this.changeSearchValue.bind(this);
  }

  changeSearchValue(value: string) {
    this.setState({
      searchValue: value,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Search callback={this.changeSearchValue} />
        <section>
          <h2 className={styles.title}>Friends</h2>
          <div className={styles.cardArea}>
            {this.state.searchValue
              ? Users.filter(
                  (user) =>
                    user.name
                      .toLocaleLowerCase()
                      .includes(this.state.searchValue.toLocaleLowerCase()) ||
                    user.city
                      .toLocaleLowerCase()
                      .includes(this.state.searchValue.toLocaleLowerCase())
                ).map((user) => (
                  <Card
                    name={user.name}
                    city={user.city}
                    img={user.img}
                    likes={user.likes}
                    views={user.views}
                    key={user.id}
                  />
                ))
              : Users.map((user) => (
                  <Card
                    name={user.name}
                    city={user.city}
                    img={user.img}
                    likes={user.likes}
                    views={user.views}
                    key={user.id}
                  />
                ))}
          </div>
        </section>
      </div>
    );
  }
}
