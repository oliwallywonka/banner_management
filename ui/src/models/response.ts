export interface Response<T> {
  data?: T
  status?: number
  message?: string
}

export class Convert {
  public static toResponse<T>(json: string): Response<T> {
    return JSON.parse(json)
  }

  public static responseToJson<T>(value: Response<T>): string {
    return JSON.stringify(value)
  }
}
