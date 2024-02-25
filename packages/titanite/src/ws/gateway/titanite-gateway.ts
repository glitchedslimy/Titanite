import ws from "ws"
import { Heart } from "../../utils/heart/heart"
import { Identify } from "../../utils/identify/identify"

/**
 * @class TitaniteWebSocket
 * @description A class to handle the WebSocket connection to the Discord Gateway
 * @property {ws.WebSocket} ws The WebSocket connection
 * @property {Heart} heart The Heart class to handle the heartbeat
 * @property {string} token The token to authenticate with the Discord Gateway
 */
export class TitaniteWebSocket {
	private ws: ws.WebSocket
	private heart: Heart
	private identify: Identify
	public token: string
	constructor(token: string) {
		this.token = token
		this.heart = new Heart()
		this.identify = new Identify()
		this.ws = new ws("wss://gateway.discord.gg/?v=10&encoding=json")
		this.ws.on("open", this.handleOpenWS.bind(this))
		this.ws.on("close", this.handleCloseWS.bind(this))
		this.ws.on("message", this.handleMessageWS.bind(this))
		this.ws.on("error", err => console.error(err))
	}

	/**
	 * @method send
	 * @description Sends data to the Discord Gateway
	 * @param {string | object} data The data to send to the Discord Gateway
	 * @returns {void}
	 */
	send(data: string | object): void {
		// Determine if the WebSocket connection is open
		if (this.ws.readyState !== ws.OPEN) {
			return
		}
		// Send the data to the Discord Gateway
		this.ws.send(JSON.stringify(data))
	}

	/**
	 * @method handleOpenWS
	 * @description Closes the WebSocket connection
	 * @returns {void}
	 */
	private handleOpenWS(): void {
		// Send the identify payload to the Discord Gateway
		this.send(this.identify.showMyIdCard(this.token))
	}

	/**
	 * @method handleMessageWS
	 * @description Handles the data received from the Discord Gateway
	 * @param {string} data The data received from the Discord Gateway
	 * @returns {void}
	 */
	private handleMessageWS(data: string): void {
		// Parse the data received from the Discord Gateway
		const payload = JSON.parse(data)
		// Detects if the payload is a heartbeat and sends the shock if the pulse is not detected
		this.heart.pulse(payload)
	}

	/**
	 * @method handleCloseWS
	 * @description Closes the WebSocket connection
	 * @returns {void}
	 */
	private handleCloseWS(): void {
		// Close the WebSocket connection and stop the heartbeat interval, bot is dead.
		this.heart.dead()
	}
}
