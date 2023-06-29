import { Member } from '../entities/member.entity';

import {
  uniqueNamesGenerator,
  adjectives,
} from 'unique-names-generator';

const genders = ['Male', 'Female'];

const generateMemberData = (): Member => {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives],
  });
  const index = Math.floor(Math.random() * genders.length);
  const randomMember = new Member();
  randomMember.name = randomName;
  randomMember.gender = genders[index];
  return randomMember;
};

export const generateMembers = (): Member[] => {
  const data: Member[] = [];

  for (let i = 0; i < 100; i++) {
    const member = generateMemberData();
    data.push(member);
  }

  return data;
};
