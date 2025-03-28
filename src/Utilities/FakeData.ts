import { faker } from "@faker-js/faker";

// Function to generate a fake user
export const generateFakeUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
});

// Function to generate multiple users
export const generateFakeUsers = (count: number) => {
  return Array.from({ length: count }, () => generateFakeUser());
};

export const generateFakeComment = (existingCommentIds: Set<number>, totalComments: number) => {
  let id;

  do{
    id = faker.number.int({min:1, max: totalComments});
  } while (existingCommentIds.has(id));

  existingCommentIds.add(id);

  return {
    id,
    comment: faker.lorem.sentence(),
  }
}

export const generateFakeComments = (count: number) => {
  const existingCommentIds = new Set<number>();
  return Array.from({length: count}, () => generateFakeComment(existingCommentIds, count));
}

export const generateFakeTag = (existingTagIds: Set<number>, totalTags: number) => {
  let tag_id;

  do{
    tag_id = faker.number.int({min:1, max: totalTags});
  } while (existingTagIds.has(tag_id));

  existingTagIds.add(tag_id);

  return {
    id: tag_id,
    title: faker.lorem.words(1),
  }
}

export const generateFakeTags = (count: number) => {
  const existingTagIds = new Set<number>();
  return Array.from({length: count}, () => generateFakeTag(existingTagIds, count));
}