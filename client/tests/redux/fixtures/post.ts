import faker from "faker";
import Filter from "bad-words";

import { IPostData } from "../../../redux/types";

export const createFakePosts = (count: number): IPostData[] => {
  const filter = new Filter();
  const retVal: IPostData[] = [];

  let id: string;
  let title: string;
  let content: string;

  while (count > 0) {
    title = faker.lorem.words(5);

    while (filter.isProfane(title)) {
      title = faker.lorem.words(5);
    }

    content = faker.lorem.paragraph(5);

    while (filter.isProfane(title)) {
      content = faker.lorem.paragraph(5);
    }

    id = faker.random.alphaNumeric(32);

    retVal.push({ title, content, id });

    count--;
  }

  return retVal;
};

export const createFakePost = (): IPostData => {
  const filter = new Filter();

  let id: string;
  let title: string;
  let content: string;

  title = faker.lorem.words(5);
  while (filter.isProfane(title)) {
    title = faker.lorem.words(5);
  }

  content = faker.lorem.paragraph(5);
  while (filter.isProfane(title)) {
    content = faker.lorem.paragraph(5);
  }

  id = faker.random.alphaNumeric(32);

  return { title, content, id };
};
