export interface IUser {
  name: string;
  img: string;
  city: string;
  likes: number;
  views: number;
  id: number;
}

export interface IPost {
  title: string | undefined;
  category: string | undefined;
  description: string | undefined;
  isDate: boolean | undefined;
  file: string | undefined;
  color: string | undefined;
  date?: string | undefined;
}
