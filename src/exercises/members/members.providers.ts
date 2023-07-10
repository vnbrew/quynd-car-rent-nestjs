import {Member} from "./entities/member.entity";
import {MEMBER_REPOSITORY} from "../../core/constants";

export const membersProviders = [{
    provide: MEMBER_REPOSITORY,
    useValue: Member,
}];