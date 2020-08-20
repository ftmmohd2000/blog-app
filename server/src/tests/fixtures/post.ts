import Filter from "bad-words";
import faker from "faker";

export const createFakePost = () => {
  const filter = new Filter();

  let title = faker.lorem.words(5);
  let content = faker.lorem.paragraphs(5, " ");

  while (filter.isProfane(title)) {
    title = faker.lorem.words(5);
  }

  while (filter.isProfane(content)) {
    content = faker.lorem.paragraphs(5, " ");
  }

  return {
    title,
    content,
    votes: 0
  };
};
