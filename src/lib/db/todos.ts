import { db } from './connection';

export async function createTodo({ userId, text }: any) {
	const todo = await db.todo.create({
		data: { text, userId: userId }
	});

	return todo;
}

export async function updateTodo({
	id,
	todo: data
}: {
	id: string;
	todo: { text: string; done: boolean };
}) {
	const todo = await db.todo.update({
		where: { id },
		data
	});

	return todo;
}

export async function deleteTodo({ id, userId }: { id: string; userId: string }) {
	const todo = await db.todo.delete({
		where: { id }
	});

	return todo;
}

export async function getTodos({ userId }: any) {
	const todos = await db.todo.findMany({
		where: { userId: userId },
		select: {
			id: true,
			text: true,
			done: true
		}
	});

	return todos;
}
