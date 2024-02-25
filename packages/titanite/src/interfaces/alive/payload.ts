import { BasePayloadInterface } from "../base/payload"

/**
 * @interface AlivePayloadInterface
 * @description Extends the base payload interface to include the heartbeat and trace of the payload
 * @param {number} heartbeat_interval The heartbeat interval of the payload
 * @param {string[]} _trace The trace of the payload
 */
export interface AlivePayloadInterface extends BasePayloadInterface {
	d: {
		heartbeat_interval: number
		_trace: string[]
	}
}
