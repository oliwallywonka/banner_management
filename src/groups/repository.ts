import { Group, GroupContent, Prisma, PrismaClient } from "@prisma/client";

export interface GroupRespository {
  getAll(): Promise<Group[]>;
  getById(id: number): Promise<Group | null>;
  create(group: Prisma.GroupCreateInput): Promise<Group>;
  update(id: number, group: Prisma.GroupUpdateInput): Promise<Group>;
  deleteById(id: number): Promise<Group>;
  createGroupContent(
    groupContent: Prisma.GroupContentCreateInput
  ): Promise<GroupContent>;
  removeContent(groupContentId: number): Promise<GroupContent>;
}

export class GroupRepositoryImpl implements GroupRespository {
  constructor(private readonly db: PrismaClient) {}

  async getAll(): Promise<Group[]> {
    const groups = await this.db.group.findMany({
      include: {
        screens: true,
        groupContents: {
          include: { content: true },
        },
      },
    });
    return groups;
  }

  async getById(id: number): Promise<Group | null> {
    return await this.db.group.findUnique({
      where: { id },
      include: {
        groupContents: {
          include: { content: true },
        },
      },
    });
  }

  async create(group: Group): Promise<Group> {
    const newGroup = await this.db.group.create({
      data: group,
    });
    return newGroup;
  }

  async update(id: number, group: Group): Promise<Group> {
    const updatedGroup = await this.db.group.update({
      where: { id: id },
      data: group,
    });
    return updatedGroup;
  }

  async createGroupContent(
    groupContent: Prisma.GroupContentCreateInput
  ): Promise<GroupContent> {
    return await this.db.groupContent.create({
      data: groupContent,
      include: {
        content: true,
      },
    });
  }

  async removeContent(groupContentId: number): Promise<GroupContent> {
    return await this.db.groupContent.delete({
      where: { id: groupContentId },
    });
  }

  async deleteById(id: number): Promise<Group> {
    throw new Error("Method not implemented.");
  }
}
