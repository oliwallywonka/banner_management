import { Static, t } from "elysia";

export const ResponseScreenDTO = t.Object({
  id: t.Number(),
  groupId: t.Number(),
  name: t.String(),
  status: t.String(),
  createdAt: t.Number(),
  updatedAt: t.Number(),
});

export const ResponseScreensDTO = t.Array(ResponseScreenDTO);
export type ResponseScreenDTO = Static<typeof ResponseScreenDTO>;

export const CreateScreenDTO = t.Object({
  screenId: t.String(),
  groupId: t.Number(),
  name: t.String(),
  status: t.Optional(t.String()),
});
export type CreateScreenDTO = Static<typeof CreateScreenDTO>;


export const transformIdDTO = ({ params }: any) => {
  const id = Number(params.id);
  if (!Number.isNaN(id)) {
    params.id = id;
  }
};