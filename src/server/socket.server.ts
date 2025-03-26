import { Server } from "socket.io";
import { groupService, screenService } from "./dependencies";

type ScreenEventPayload = Array<Number>;

export const events = {
  GROUP_LIST: "group:list",
  GROUP_UNIQUE: "group:unique",
  GROUP_CREATE: "group:create",
  GROUP_CONTENT_ADD: "group:contents:add",

  SCREEN_CREATE: "screen:create",
  SCREEN_UPDATE_STATUS: "screen:update:status",
  SCREEN_CONTENT_PLAY: "screen:content:play",
  SCREEN_CONTENT_PAUSE: "screen:content:pause",
  SCREEN_CONTENT_STOP: "screen:content:stop",
} as const;

export class SocketServer {
  public io: Server;
  private static instance: SocketServer;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketServer();
    }
    return this.instance;
  }

  constructor() {
    this.io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    }).listen(3001);
    this.startEvents();
  }

  private async startEvents() {
    //TODO: use rooms to join each screen socket with an admin socket to prevent mixing of data
    console.log("SOCKET server started at port 3001");
    this.io.on("connection", (socket) => {

      // TODO: Implement authentication based on screenCode

      console.log("connected", socket.handshake.auth);
      console.log(this.io.engine.clientsCount);

      socket.on("disconnect", async () => {
        // TODO: verify if there are another client screen connected based on socket.handshake.auth
        console.log("disconnect", socket.handshake.auth);
        if (socket.handshake.auth.screenId === -1) return;
        const screen = await screenService.update(
          socket.handshake.auth.screenId,
          {
            status: "disconnected",
          }
        );
        this.io.emit(events.SCREEN_UPDATE_STATUS, screen);
      });

      /********* GROUP EVENTS *********/
      socket.on(events.GROUP_LIST, async () => {
        try {
          const groups = await groupService.getAll();
          this.io.emit(events.GROUP_LIST, groups);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on(events.GROUP_UNIQUE, async (groupId: number) => {
        try {
          const contents = await groupService.getById(groupId);
          this.io.emit(events.GROUP_UNIQUE, contents);
        } catch (error) {}
      });

      /********* SCREEN EVENTS *********/
      socket.on(
        events.SCREEN_UPDATE_STATUS,
        async (payload: { id: number; status: string }) => {
          try {
            const screen = await screenService.update(payload.id, {
              status: payload.status,
            });
            this.io.emit(events.SCREEN_UPDATE_STATUS, screen);
          } catch (error) {
            console.log(error);
          }
        }
      );

      socket.on(
        events.SCREEN_CONTENT_PLAY,
        (screenList: ScreenEventPayload) => {
          console.log("play", screenList);
          this.io.emit(events.SCREEN_CONTENT_PLAY, screenList);
        }
      );

      socket.on(
        events.SCREEN_CONTENT_PAUSE,
        (screenList: ScreenEventPayload) => {
          console.log("pause", screenList);
          this.io.emit(events.SCREEN_CONTENT_PAUSE, screenList);
        }
      );

      socket.on(
        events.SCREEN_CONTENT_STOP,
        (screenList: ScreenEventPayload) => {
          console.log("stop", screenList);
          this.io.emit(events.SCREEN_CONTENT_STOP, screenList);
        }
      );
    });
  }
}
