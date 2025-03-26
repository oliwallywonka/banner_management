import { Prisma, type PrismaClient, Screen } from "@prisma/client";
import { getUnixTime } from "@src/helpers/date";

export interface ScreenRepository {
  getAll(): Promise<Screen[]>;
  getById(id: number): Promise<Screen | null>;
  getByGroupId(groupId: number): Promise<Screen[]>;
  save(Screen: Prisma.ScreenCreateInput): Promise<Screen>;
  update(screenId: number, screen: Prisma.ScreenUpdateInput): Promise<Screen>;
  delete(screenId: number): Promise<void>;
}

export class ScreenRepositoryImpl implements ScreenRepository {
  constructor(private readonly db: PrismaClient) {}

  async getAll(): Promise<Screen[]> {
    const screens = await this.db.screen.findMany();
    return screens;
  }

  async getById(id: number): Promise<Screen | null> {
    const screen = await this.db.screen.findUnique({
      where: { id },
    });
    return screen;
  }

  async getByGroupId(groupId: number): Promise<Screen[]> {
    const screens = await this.db.screen.findMany({
      where: { groupId },
    });
    return screens;
  }

  async save(screen: Prisma.ScreenCreateInput): Promise<Screen> {
    const newScreen = await this.db.screen.create({
      data: screen,
    });
    return newScreen;
  }

  async update(id: number, screen: Prisma.ScreenUpdateInput): Promise<Screen> {
    const updatedScreen = await this.db.screen.update({
      data: { ...screen, updatedAt: getUnixTime() },
      where: { id },
    });
    return updatedScreen;
  }

  async delete(screenId: number): Promise<void> {
    await this.db.screen.delete({
      where: { id: screenId },
    });
  }
}
