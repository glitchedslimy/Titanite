/**
 * @class Identify
 * @description This class is used to identify the client to the gateway
 * @param {string} token The token of the client
 */
export class Identify {
	/**
	 * @method showMyIdCard
	 * @description The showMyIdCard method is used to identify the client to the gateway
	 * @returns {object}
	 */
	public showMyIdCard(token: string): object {
		return {
			op: 2,
			d: {
				token: token,
				properties: {
					$os: process.platform,
					$browser: "titanite-client",
					$device: "titanite-client"
				},
				intents: 521
			}
		}
	}
}
