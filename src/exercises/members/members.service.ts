import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { generateMembers } from './helper/menber.helper';

@Injectable()
export class MembersService {
  private readonly members: Member[] = [];

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  findAll() {
    // const newMember = new Member();
    // newMember.name = 'Lê Nhật Anh';
    // newMember.gender = 'Male';
    // return {
    //   members: [newMember],
    // };
    return {
      members: generateMembers(),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
