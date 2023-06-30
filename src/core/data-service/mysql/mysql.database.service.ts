import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AbsDataServices } from 'src/core/base/abstracts/data.service.abstract';
import { AbsGenericRepository } from 'src/core/base/abstracts/generic.repository.abstract';
import { Cat } from 'src/exercises/cats/entities/cat.entity';
import { Member } from 'src/exercises/members/entities/member.entity';
import { MySQLGenericRepository } from './mysql.generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MySQLDataService
  implements AbsDataServices, OnApplicationBootstrap
{
  members: AbsGenericRepository<Member>;
  casts: AbsGenericRepository<Cat>;

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  onApplicationBootstrap() {
    this.members = new MySQLGenericRepository<Member>(this.memberRepository);
    this.casts = new MySQLGenericRepository<Cat>(this.catRepository);
  }
}
