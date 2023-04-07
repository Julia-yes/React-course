export interface IUser {
  name: string;
  img: string;
  city: string;
  likes: number;
  views: number;
  id: number;
}

export interface IData {
  info: IResponseInfo;
  results: [ICharacter];
}

export interface IResponseInfo {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface ICharacter {
  name: string;
  status: string;
  gender: string;
  image: string;
  id: number;
  type: string;
  species: string;
}

export interface IPost {
  title: string | undefined;
  category: string | undefined;
  description: string | undefined;
  file: string | undefined;
  color: string | undefined;
  date: string | undefined;
  key: number | undefined;
}
