import { PrismaClient } from '@prisma/client';

export interface IPrismaService extends PrismaClient {}

export class PrismaService extends PrismaClient implements IPrismaService {}
