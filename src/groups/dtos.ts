import { ResponseScreensDTO } from "@src/screen/dtos";
import { Static, t } from "elysia";

export const ResponseGroupContentDTO = t.Object({
  id: t.Number(),
  contentId: t.Number(),
  groupId: t.Number(),
  createdAt: t.Number(),
  updatedAt: t.Number(),
  content: t.Optional(
    t.Object({
      id: t.Number(),
      title: t.String(),
      type: t.UnionEnum(["IMAGE", "INVENTORY"]),
      url: t.Nullable(t.String()),
      duration: t.Number(),
      createdAt: t.Number(),
      updatedAt: t.Number(),
    })
  ),
});

export const ResponseGroupDTO = t.Object({
  id: t.Number(),
  name: t.String(),
  groupContents: t.Optional(t.Array(ResponseGroupContentDTO)),
  screens: t.Optional(ResponseScreensDTO),
});
export const ResponseGroupsDTO = t.Array(ResponseGroupDTO);
export type ResponseGroupDTO = Static<typeof ResponseGroupDTO>;

export const CreateGroupDTO = t.Object({
  name: t.String(),
});
export type CreateGroupDTO = Static<typeof CreateGroupDTO>;

export const UpdateGroupDTO = t.Object({
  name: t.Optional(t.String()),
});
export type UpdateGroupDTO = Static<typeof UpdateGroupDTO>;

export const CreateGroupContentDTO = t.Object({
  file: t.Optional(t.File()),
  title: t.String(),
  type: t.String(),
  duration: t.Number(),
});
export type CreateGroupContentDTO = Static<typeof CreateGroupContentDTO>;

/* NEED IT BECAUSE THE ROUTE USES """FORMDATA TYPE""" TODO: FIX ANY TYPE */
export const transformGroupContentDTO = ({ body }: any) => {
  const duration = Number(body.duration);
  if (!Number.isNaN(duration)) {
    body.duration = duration;
  }
};

export const transformIdDTO = ({ params }: any) => {
  const id = Number(params.id);
  if (!Number.isNaN(id)) {
    params.id = id;
  }
};
