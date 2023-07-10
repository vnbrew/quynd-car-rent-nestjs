import { Inject, Injectable } from "@nestjs/common";
import { UpdateMemberDto } from "./dto/update-member.dto";
import { MEMBER_REPOSITORY } from "../../core/constants";
import { Member } from "./entities/member.entity";
import { IMember } from "./interfaces/member.interface";

@Injectable()
export class MembersService {
  constructor(@Inject(MEMBER_REPOSITORY) private readonly memberRepository: typeof Member) {
  }

  async createMember(member: IMember): Promise<Member> {
    try {
      return await this.memberRepository.create<Member>(member);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return this.memberRepository.findAll();
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
