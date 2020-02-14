import history from '../history';

export const capitalise = (word: string) =>
  word.replace(/./, firstLetter => firstLetter.toUpperCase());

export const redirect = (path: string) =>
  history.push(`${process.env.PUBLIC_URL}/${path}`);

export const cardColours = [
  'is-primary',
  'is-link',
  'is-info',
  'is-success',
  'is-warning',
  'is-danger'
];

export const current = { role: 'staff' };
