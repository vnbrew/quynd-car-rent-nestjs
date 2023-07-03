import { MixedList } from "typeorm";
import { InitizaliTable1688188358702 } from "./1688188358702-initizali_table";
import { UpdateMembersTable1688188564268 } from "./1688188564268-update_members_table";
import { UpdateMembersTable1688193593456 } from "./1688193593456-update_members_table";

export const MIGRATIONS_FILE_NAME: MixedList<Function | string> = [
    InitizaliTable1688188358702,
    UpdateMembersTable1688188564268,
    UpdateMembersTable1688193593456,
]