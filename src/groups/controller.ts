import { groupService, socketServer } from "@src/server/dependencies";
import Elysia, { t } from "elysia";
import {
  CreateGroupContentDTO,
  CreateGroupDTO,
  ResponseGroupContentDTO,
  ResponseGroupDTO,
  ResponseGroupsDTO,
  transformGroupContentDTO,
  UpdateGroupDTO,
} from "./dtos";
import { events } from "@src/server/socket.server";

export const GroupController = new Elysia().group("/groups", (app) =>
  app

    /********* GET ALL GROUPS *********/
    .get(
      "/",
      async ({ set }) => {
        try {
          const groups = await groupService.getAll();
          return {
            status: 200,
            data: groups,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseGroupsDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Group"],
          description: "Get all groups",
          summary: "Get all groups",
        },
      }
    )

    /********* CREATE GROUP *********/
    .post(
      "/",
      async ({ body, set }) => {
        try {
          const group = await groupService.create(body);
          socketServer.io.emit(events.GROUP_CREATE, group);
          return {
            status: 200,
            data: group,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        body: CreateGroupDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseGroupDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Group"],
          summary: "Create a group",
          description: "Create a group object",
        },
      }
    )

    /********* UPDATE GROUP *********/
    .put(
      "/:id",
      async ({ params, body, set }) => {
        try {
          const group = await groupService.update(params.id, body);
          return {
            status: 200,
            data: group,
          };
        } catch (error) {
          const err = error as Error;
          set.status = 500;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        params: t.Object({
          id: t.Number(),
        }),
        body: UpdateGroupDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseGroupDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Group"],
          summary: "Update a group",
          description: "Update a group object",
        },
      }
    )

    /********* ADD CONTENT TO GROUP *********/
    .post(
      "/:id/content",
      async ({ params, body }) => {
        try {
          const groupContent = await groupService.addContent(params.id, body);
          // TODO: EMIT EVENT FROM SOCKET SERVER
          socketServer.io.emit(events.GROUP_CONTENT_ADD, groupContent);
          return {
            status: 200,
            data: groupContent,
          };
        } catch (error) {
          const err = error as Error;
          return {
            status: 500,
            message: err.message,
          };
        }
      },
      {
        body: CreateGroupContentDTO,
        params: t.Object({
          id: t.Number(),
        }),
        transform: transformGroupContentDTO,
        response: {
          200: t.Object({
            status: t.Literal(200),
            data: ResponseGroupContentDTO,
          }),
          500: t.Object({
            status: t.Literal(500),
            message: t.String(),
          }),
        },
        detail: {
          tags: ["Group"],
          summary: "Add content to a group",
          description:
            "Add content to a group creates groupContent and content models",
        },
      }
    )
);
