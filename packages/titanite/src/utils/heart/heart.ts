import { AlivePayloadInterface } from "../../interfaces/alive/payload"

/**
 * @class Heart
 * @description The Heart class is used to manage the heartbeat interval and sequence number for the Discord Gateway
 * @public
 * @property {NodeJS.Timeout | null} heartbeatInterval The interval to send the heartbeat to the Discord Gateway
 * @property {number | null} sequence The sequence number for the Discord Gateway
 */
export class Heart {
	public heartbeatInterval: NodeJS.Timeout | null = null
	public sequence: number | null = null

	/**
	 * @method pulse
	 * @description The pulse method is used to manage the heartbeat interval and sequence number for the Discord Gateway
	 * @param payload
	 * @returns {void}
	 */
	public pulse(payload: AlivePayloadInterface | null): void {
		// Determine if the payload is null
		if (!payload) {
			return
		}
		// Determine the opcode of the payload to handle the payload accordingly
		// 11: Heartbeat ACK
		// 10: Hello
		// 0: Dispatch / Event recieved
		switch (payload.op) {
			case 11: {
				break
			}
			case 10: {
				this.heartbeatInterval = setInterval(() => {
					this.shock()
				}, payload.d.heartbeat_interval)
				break
			}
			case 0: {
				this.sequence = payload.s
				break
			}
		}
	}

	/**
	 * @method shock
	 * @description The shock method is used to send the heartbeat to the Discord Gateway
	 * @returns {object}
	 */
	public shock(): object {
		return {
			op: 1,
			d: this.sequence
		}
	}

	/**
	 * @method dead
	 * @description The dead method is used to clear the heartbeat interval when the WebSocket connection is closed
	 * @returns {void}
	 */
	public dead(): void {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval)
			this.heartbeatInterval = null
		}
	}
}
