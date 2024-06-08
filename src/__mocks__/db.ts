import { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";

// it manages all mocking of all keys of this class
export const prisma = mockDeep<PrismaClient>();

