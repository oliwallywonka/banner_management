import { Prisma, type PrismaClient, Screen } from "@prisma/client";

export interface ScreenRepository {
  getAll(): Promise<Screen[]>;
  getById(id: number): Promise<Screen | null>;
  save(Screen: Prisma.ScreenCreateInput): Promise<Screen>;
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
      include: {
        contentScreens: {
          include: {
            content: true
          }
        }
      }

    });
    return screen;
  }

  async save(screen: Prisma.ScreenCreateInput): Promise<Screen> {
    const newScreen = await this.db.screen.create({
      data: screen,
    });
    return newScreen;
  }

  async delete(screenId: number): Promise<void> {
    await this.db.screen.delete({
      where: { id: screenId }
    });
  }
}
