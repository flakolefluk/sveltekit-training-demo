import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
export const post: RequestHandler = async () => {
	return {
		status: 302,
		headers: {
			'set-cookie': cookie.serialize('session', '', {
				path: '/',
				expires: new Date(0)
			}),
			location: '/login'
		}
	};
};
