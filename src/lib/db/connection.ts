import { PrismaClient } from "@prisma/client";

let db: PrismaClient = new PrismaClient()

export { db };