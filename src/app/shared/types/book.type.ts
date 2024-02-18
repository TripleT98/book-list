import { Author } from './author.type';
import { Lang } from './lang.type';

export type Book = {
  id: number;
  name: string;
  authorId: number;
  description: string;
  pageCount: number;
  langId: number;
  style: string;
}

export interface BookInfo extends Book {
  author?: Author;
  lang?: Lang;
}
