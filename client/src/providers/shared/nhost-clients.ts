import nhost from './nhost-js-sdk';
import { Config } from './config';

nhost.initializeApp({
	base_url: Config.nHost,
});

export const nhostAuthClient = nhost.auth();
export const nhostStorageClient = nhost.storage();
