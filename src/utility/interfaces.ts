export interface IWebsocketServerData {
  status: number
  code?: string
  message?: string
  body?: any
}

export interface IWebsocketClientData {
  code?: string
  body: any
}

export interface ChatMessage {
  author: string
  message: string
}

export interface IPropControl {
  setScene?: (scene: string) => void
}