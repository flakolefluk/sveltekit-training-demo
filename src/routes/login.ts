import type { RequestHandler } from '@sveltejs/kit';
import { login } from '$lib/db/auth';
import * as cookie from 'cookie';
function validateUsername(username: unknown) {
	if (typeof username !== 'string' || username.length < 3) {
		return `Usernames must be at least 3 characters long`;
	}
}

function validatePassword(password: unknown) {
	if (typeof password !== 'string' || password.length < 6) {
		return `Passwords must be at least 6 characters long`;
	}
}

export const post: RequestHandler = async ({ request }) => {
	let form = await request.formData();
	let username = form.get('username');
	let password = form.get('password');
	let redirectTo = '/todos';
	if (
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		typeof redirectTo !== 'string'
	) {
		return { body: { formError: `Form not submitted correctly.` } };
	}

	let fields = { username, password };
	let fieldErrors = {
		username: validateUsername(username),
		password: validatePassword(password)
	};
	if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

	let user = await login({ username, password });
	if (!user) {
		return {
			body: {
				fields,
				formError: `Username/Password combination is incorrect`
			}
		};
	}
	return {
		status: 302,
		headers: {
			'Set-Cookie': cookie.serialize('session', user.id, {
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
				maxAge: 60 * 60 * 24 * 30,
				httpOnly: true
			}),
			location: redirectTo
		}
	};
};
