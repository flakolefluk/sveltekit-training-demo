import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db/connection';
import { register } from '$lib/db/auth';

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

	if (typeof username !== 'string' || typeof password !== 'string') {
		return { body: { formError: `Form not submitted correctly.` } };
	}

	let fields = { username, password };
	let fieldErrors = {
		username: validateUsername(username),
		password: validatePassword(password)
	};
	if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

	let userExists = await db.user.findFirst({
		where: { username }
	});
	if (userExists) {
		return {
			body: {
				fields,
				formError: `User with username ${username} already exists`
			}
		};
	}
	const user = await register({ username, password });
	if (!user) {
		return {
			body: {
				fields,
				formError: `Something went wrong trying to create a new user.`
			}
		};
	}
	return {
		status: 303,
		headers: {
			location: '/login'
		}
	};
};
