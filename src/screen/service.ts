import { Screen, Prisma } from "@prisma/client";
import { ScreenRepository } from "./repository";
import type { CreateScreenDTO } from "./dtos";
import { getUnixTime } from "../helpers/date";
import { generateCode } from "@src/helpers/code";

export interface ScreenService {
  getAll(): Promise<Screen[]>;
  getById(id: number): Promise<Screen | null>;
  getByCode(code: string): Promise<Screen | null>;
  save(screen: CreateScreenDTO): Promise<Screen>;
  update(screenId: number, screen: Prisma.ScreenUpdateInput): Promise<Screen>;
  updateByCode(code: string, screen: Prisma.ScreenUpdateInput): Promise<Screen>;
}

export class ScreenServiceImpl implements ScreenService {
  constructor(private readonly screenRepository: ScreenRepository) {}

  async getAll(): Promise<Screen[]> {
    return await this.screenRepository.getAll();
  }

  async getById(id: number): Promise<Screen | null> {
    return await this.screenRepository.getById(id);
  }

  async getByCode(code: string): Promise<Screen | null> {
    return await this.screenRepository.getByCode(code);
  }

  async save(dto: CreateScreenDTO): Promise<Screen> {
    const newScreen: Prisma.ScreenCreateInput = {
      group: {
        connect: {
          id: dto.groupId,
        },
      },
      code: generateCode(),
      name: dto.name,
      status: dto.status ?? "UNREGISTERED",
      screenId: dto.screenId,
      createdAt: getUnixTime(),
      updatedAt: getUnixTime(),
    };
    return await this.screenRepository.save(newScreen);
  }

  async update(
    screenId: number,
    screen: Prisma.ScreenUpdateInput
  ): Promise<Screen> {
    return await this.screenRepository.update(screenId, screen);
  }

  async updateByCode(
    code: string,
    screen: Prisma.ScreenUpdateInput
  ): Promise<Screen> {
    const screens = await this.screenRepository.updateByCode(code, screen);
    if (screens.length === 0) throw new Error('Screen not found');
    return screens[0];
  }
}
