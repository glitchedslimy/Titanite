/**
 * @interface BasePayloadInterface
 * @description The base payload interface
 * @param {number} op The opcode of the payload
 * @param {object} d The data of the payload
 * @param {number} s The sequence number of the payload
 * @param {string} t The event name of the payload
 */
export interface BasePayloadInterface {
	op: number
	d: object
	s: number
	t: string
}
