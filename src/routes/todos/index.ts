import { createTodo, deleteTodo, getTodos, updateTodo } from '$lib/db/todos';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		return {
			status: 302,
			headers: {
				location: '/login'
			}
		};
	}

	const todos = await getTodos({ userId: locals.user.id });

	return {
		status: 200,
		body: {
			todos: todos
		}
	};
};

const redirect = {
	status: 303,
	headers: {
		location: '/todos'
	}
};

export const post: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return {
			status: 302,
			headers: {
				location: '/login'
			}
		};
	}

	const form = await request.formData();
	await createTodo({ userId: locals.user.id, text: form.get('text') });
	return redirect;
};

export const patch: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return {
			status: 302,
			headers: {
				location: '/login'
			}
		};
	}
	const form = await request.formData();

	await updateTodo({
		id: form.get('id') as string,
		todo: {
			...(form.has('text') ? {text: form.get('text') as string} : {}),
			...(form.has('done') ? {done: (!!form.get('done') as boolean)} : {})
		} as any
	});

	return redirect;
};

export const del: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return {
			status: 302,
			headers: {
				location: '/login'
			}
		};
	}
	const form = await request.formData();

	await deleteTodo({id: form.get("id") as string, userId:locals.user.id })

	return redirect;
};
