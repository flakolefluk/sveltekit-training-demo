import bcrypt from 'bcryptjs';

import { db } from './connection';

type LoginForm = {
	username: string;
	password: string;
};

export async function register({ username, password }: LoginForm) {
	const passwordHash = await bcrypt.hash(password, 10);
	const user = await db.user.create({
		data: { username, password: passwordHash }
	});
	return { id: user.id, username };
}

export async function login({ username, password }: LoginForm) {
	const user = await db.user.findUnique({
		where: { username }
	});
	if (!user) return null;
	const check = await bcrypt.compare(password, user.password);
	if (!check) return null;
	return { id: user.id, username };
}

