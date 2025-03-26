import { Group, GroupContent, Prisma } from "@prisma/client";
import { GroupRespository } from "./repository";
import type {
  CreateGroupContentDTO,
  CreateGroupDTO,
  UpdateGroupDTO,
} from "./dtos";
import { saveFile } from "@src/helpers/file";
import { getUnixTime } from "@src/helpers/date";

export interface GroupService {
  getAll(): Promise<Group[]>;
  getById(id: number): Promise<Group | null>;
  create(group: CreateGroupDTO): Promise<Group>;
  update(id: number, group: UpdateGroupDTO): Promise<Group>;
  deleteById(id: number): Promise<Group>;
  addContent(
    groupId: number,
    dto: CreateGroupContentDTO
  ): Promise<GroupContent>;
}

export class GroupServiceImpl implements GroupService {
  constructor(private readonly groupRepository: GroupRespository) {}

  async getAll(): Promise<Group[]> {
    return await this.groupRepository.getAll();
  }

  async getById(id: number): Promise<Group | null> {
    return await this.groupRepository.getById(id);
  }

  async create(group: CreateGroupDTO): Promise<Group> {
    return await this.groupRepository.create(group);
  }

  async update(id: number, group: UpdateGroupDTO): Promise<Group> {
    return await this.groupRepository.update(id, group);
  }

  async addContent(
    groupId: number,
    dto: CreateGroupContentDTO
  ): Promise<GroupContent> {
    const group = await this.groupRepository.getById(groupId);
    if (!group) throw new Error("Group not found");
    let filePath: string | null = null;
    if (dto.file) {
      filePath = await saveFile(dto.file);
    }

    const newGroupContent: Prisma.GroupContentCreateInput = {
      group: {
        connect: {
          id: groupId,
        },
      },
      content: {
        create: {
          title: dto.title,
          type: dto.type,
          duration: dto.duration,
          url: filePath,
          createdAt: getUnixTime(),
          updatedAt: getUnixTime(),
        },
      },
      createdAt: getUnixTime(),
      updatedAt: getUnixTime(),
    };
    return await this.groupRepository.createGroupContent(newGroupContent);
  }

  async deleteById(id: number): Promise<Group> {
    return await this.groupRepository.deleteById(id);
  }
}
