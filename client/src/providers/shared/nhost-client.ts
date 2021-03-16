
import { createClient, UserConfig } from 'nhost-js-sdk';
import { Config } from "./config";

export default createClient( {
	baseURL: Config.nHost,
	autoLogin: true,
} as UserConfig);
