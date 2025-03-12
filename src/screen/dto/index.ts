import { Static, t } from "elysia";

export const ResponseContentScreenDTO = t.Object({
  id: t.Number(),
  screenId: t.Number(),
  startAt: t.Number(),
  endAt: t.Number(),
  createdAt: t.Number(),
  updatedAt: t.Number(),
  content: t.Optional(
    t.Object({
      id: t.Number(),
      title: t.String(),
      type: t.String(),
      url: t.String(),
      duration: t.Number(),
      createdAt: t.Number(),
      updatedAt: t.Number(),
    })
  ),
});

export const ResponseScreenDTO = t.Object({
  id: t.Number(),
  name: t.String(),
  status: t.String(),
  createdAt: t.Number(),
  updatedAt: t.Number(),
  contentScreens: t.Optional(
    t.Array(
      ResponseContentScreenDTO
    )
  ),
});
export const ResponseScreensDTO = t.Array(ResponseScreenDTO);
export type ResponseScreenDTO = Static<typeof ResponseScreenDTO>;



export const CreateScreenDTO = t.Object({
  screenId: t.String(),
  name: t.String(),
  status: t.String(),
});
export type CreateScreenDTO = Static<typeof CreateScreenDTO>;


export const CreateScreenContentDTO = t.Object({
  file: t.File(),

  /*** content object ***/
  title: t.String(),
  type: t.String(),
  duration: t.Number(),

  /*** contentScreen object ***/
  startAt: t.Number(),
  endAt: t.Number(),
});
export type CreateScreenContentDTO = Static<typeof CreateScreenContentDTO>;

/* NEED IT BECAUSE THE ROUTE USES """FORMDATA TYPE""" TODO: FIX ANY TYPE */
export const transformScreenContentDTO = ({ body }: any) => {
  const duration = Number(body.duration);
  const startAt = Number(body.startAt);
  const endAt = Number(body.endAt);
  if (!Number.isNaN(duration)) {
    body.duration = duration;
  }
  if (!Number.isNaN(startAt)) {
    body.startAt = startAt;
  }
  if (!Number.isNaN(endAt)) {
    body.endAt = endAt;
  }
};

export const transformIdDTO = ({ params }: any) => {
  const id = Number(params.id);
  if (!Number.isNaN(id)) {
    params.id = id;
  }
};
