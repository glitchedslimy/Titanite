import { TitaniteWebSocket } from "./ws/gateway/titanite-gateway"

export class TitaniteClient {
	private token: string
	constructor(token: string) {
		this.token = token
	}

	public start() {
		new TitaniteWebSocket(this.token)
	}
}
