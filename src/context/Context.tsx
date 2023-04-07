import { ICharacter, IData } from 'interfaces';
import { createContext, memo, PropsWithChildren, useEffect, useState } from 'react';
import { LoadSource } from './LoadSource';

interface IDataContext {
  searchValue: string | null;
  setNewValue(value: string): void;
  data: IData | null;
  setNewData(newData: IData | null): void;
  loading: boolean;
  setNewLoading(value: boolean): void;
  character: ICharacter | null;
  setNewCharacter(newData: ICharacter | null): void;
  activePage: number;
  setNewActivePage(page: number): void;
}

export const DataContext = createContext<IDataContext>({
  searchValue: '',
  setNewValue: () => {},
  data: null,
  setNewData: () => {},
  loading: false,
  setNewLoading: () => {},
  character: null,
  setNewCharacter: () => {},
  activePage: 1,
  setNewActivePage: () => {},
});

export const DataProvider = memo(({ children }: PropsWithChildren) => {
  const [searchValue, setSearchValue] = useState<string | null>(localStorage.getItem('search'));
  const setNewValue = (value: string) => {
    setSearchValue(value);
  };

  const [data, setData] = useState<IData | null>(null);
  const setNewData = (value: IData | null) => {
    setData(value);
  };

  const [loading, setLoading] = useState(false);
  const setNewLoading = (value: boolean) => {
    setLoading(value);
  };

  const [character, setCharacter] = useState<ICharacter | null>(null);
  const setNewCharacter = (value: ICharacter | null) => {
    setCharacter(value);
  };

  const [activePage, setPage] = useState(1);
  const setNewActivePage = async (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    LoadSource(searchValue)
      .then((docs) => {
        setData(docs);
      })
      .catch((e) => {
        setData(null);
      })
      .finally(() => {
        setLoading(false);
        setNewActivePage(1);
      });
  }, [setData, searchValue]);

  return (
    <DataContext.Provider
      value={{
        searchValue,
        setNewValue,
        data,
        setNewData,
        loading,
        setNewLoading,
        character,
        setNewCharacter,
        activePage,
        setNewActivePage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
});
