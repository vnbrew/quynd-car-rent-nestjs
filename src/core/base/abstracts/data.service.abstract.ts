import { Cat } from "src/exercises/cats/entities/cat.entity";
import { AbsGenericRepository } from "./generic.repository.abstract";
import { Member } from "src/exercises/members/entities/member.entity";

export abstract class AbsDataServices {
    abstract members: AbsGenericRepository<Member>;
    abstract casts: AbsGenericRepository<Cat>;
}
