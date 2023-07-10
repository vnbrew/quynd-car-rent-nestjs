import {Injectable} from '@nestjs/common';
import {CreateMemberDto} from '../dto/create-member.dto';
import {UpdateMemberDto} from '../dto/update-member.dto';
import {IMember} from "../interfaces/member.interface";


@Injectable()
export class MemberFactory {
    createNewMember(createMemberDto: CreateMemberDto) {
        const newMember: IMember =
            {
                name: createMemberDto.name,
                email: createMemberDto.email,
                password: createMemberDto.password,
            }
        return newMember;
    }

    updateMember(updateMemberDto: UpdateMemberDto) {
        const newMember: IMember =
            {
                name: updateMemberDto.name,
                email: updateMemberDto.email,
                password: updateMemberDto.password,
            }
        return newMember;
    }
}
