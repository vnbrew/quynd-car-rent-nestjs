import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../dto/create-member.dto';
import { Member } from '../entities/member.entity';
import { UpdateMemberDto } from '../dto/update-member.dto';

@Injectable()
export class MemberFactory {
  createNewMember(createMemberDto: CreateMemberDto) {
    const newMember = new Member();
    newMember.name = createMemberDto.name;
    newMember.gender = createMemberDto.gender;
    return newMember;
  }

  updateMember(updateMemberDto: UpdateMemberDto) {
    const newMember = new Member();
    newMember.name = updateMemberDto.name;
    newMember.gender = updateMemberDto.gender;
    return newMember;
  }
}
