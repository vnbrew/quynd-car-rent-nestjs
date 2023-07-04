import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMemberResponse } from './response/member.response';
import { MemberFactory } from './factory/member.factory';
import { AppExceptionService } from 'src/core/exception/app.exception.service';
import { IBaseExceptionMessage } from 'src/core/exception/app.exception.interface';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly memberFactory: MemberFactory,
    private readonly exceptionService: AppExceptionService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  async create(
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<CreateMemberResponse> {
    const createMemberResponse = new CreateMemberResponse();
    try {
      const member = this.memberFactory.createNewMember(createMemberDto);
      const createdMember = await this.membersService.createMember(member);
      createMemberResponse.success = true;
      createMemberResponse.createdMember = createdMember;
    } catch (e) {
      createMemberResponse.success = false;
      const errorResponse: IBaseExceptionMessage = {
        message: this.i18n.translate('validation.data.type', {
          lang: I18nContext.current().lang,
        }),
        code_error: 1000,
        sub_code_error: 'NC001',
      };
      throw this.exceptionService.badRequestException(errorResponse);
      // throw new BadRequestException(errorResponse);
    }
    return createMemberResponse;
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
