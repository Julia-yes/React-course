import { IData } from 'interfaces';

export const LoadSource = async (searchValue: string | null, page?: number): Promise<IData> => {
  const apiUrl = searchValue
    ? page
      ? `https://rickandmortyapi.com/api/character/?name=${searchValue}&page=${page}`
      : `https://rickandmortyapi.com/api/character/?name=${searchValue}`
    : page
    ? `https://rickandmortyapi.com/api/character?page=${page}`
    : `https://rickandmortyapi.com/api/character`;

  const response = fetch(apiUrl);
  if (!(await response).ok) throw new Error('Could not load the data from the resourse');
  const data = await (await response).json();
  return data;
};

export const LoadCharacter = async (id: number) => {
  const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;

  const response = await fetch(apiUrl);
  if (!(await response).ok) throw new Error('Could not load the data from the resourse');
  const data = await response.json();
  return data;
};
