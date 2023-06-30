import { Member } from '../entities/member.entity';

export class CreateMemberResponse {
  success: boolean;
  createdMember: Member;
}
