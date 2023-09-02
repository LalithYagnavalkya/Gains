import logger from "pino";

const log = logger({
	transport: {
		target: "pino-pretty",
		options: {
			translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
			ignore: "pid,hostname",
		},
	},
});
export default log;
