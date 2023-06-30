import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AbsDataServices } from 'src/core/base/abstracts/data.service.abstract';
import { MemberFactory } from './factory/member.factory';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(private readonly dataServices: AbsDataServices) {}

  async createMember(member: Member): Promise<Member> {
    try {
      const createdMember = await this.dataServices.members.createOrUpdate(member);
      return createdMember;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.dataServices.members.findAll();
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
