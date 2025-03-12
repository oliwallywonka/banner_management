import { Screen, ContentScreen, Prisma } from "@prisma/client";
import { ScreenRepository } from "../repositories/screen.repository";
import { ContentRepository } from "../repositories/content.repository";
import type { CreateScreenDTO, CreateScreenContentDTO } from "../dto";
import { getUnixTime } from "../../helpers/date";

export interface ScreenService {
  getAll(): Promise<Screen[]>;
  getById(id: number): Promise<Screen | null>;
  save(screen: CreateScreenDTO): Promise<Screen>;
  addContent(
    screenId: number,
    dto: CreateScreenContentDTO
  ): Promise<ContentScreen>;
}

export class ScreenServiceImpl implements ScreenService {
  constructor(
    private readonly screenRepository: ScreenRepository,
    private readonly contentRepository: ContentRepository
  ) {}

  async getAll(): Promise<Screen[]> {
    return await this.screenRepository.getAll();
  }

  async getById(id: number): Promise<Screen | null> {
    return await this.screenRepository.getById(id);
  }

  async save(dto: CreateScreenDTO): Promise<Screen> {
    const newScreen: Prisma.ScreenCreateInput = {
      name: dto.name,
      status: dto.status,
      screenId: dto.screenId,
      createdAt: getUnixTime(),
      updatedAt: getUnixTime(),
    };
    return await this.screenRepository.save(newScreen);
  }

  async addContent(
    screenId: number,
    dto: CreateScreenContentDTO
  ): Promise<ContentScreen> {
    const screen = await this.screenRepository.getById(screenId);
    if (!screen) throw new Error("Screen not found");

    const filePath = await this.saveFile(dto.file);

    const newContentScreen: Prisma.ContentScreenCreateInput = {
      content: {
        create: {
          title: dto.title!,
          type: dto.type,
          duration: dto.duration,
          url: filePath,
          createdAt: getUnixTime(),
          updatedAt: getUnixTime(),
        },
      },
      screen: {
        connect: {
          id: screenId,
        },
      },
      startAt: dto.startAt,
      endAt: dto.endAt,
      createdAt: getUnixTime(),
      updatedAt: getUnixTime(),
    };

    return await this.contentRepository.save(newContentScreen);
  }

  private async saveFile(file: File): Promise<string> {
    const fileName = file.name;
    const uuid = Bun.randomUUIDv7();
    const fileComposedName = `${uuid}.${fileName}`;
    const filePath = `./uploads/${fileComposedName}`;

    await Bun.write(filePath, file);
    return fileComposedName;
  }
}
