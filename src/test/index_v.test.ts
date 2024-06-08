import { describe, expect, it, vi } from 'vitest';
import { app } from '../index';
import request from "supertest";
import { prisma } from '../__mocks__/db';

// mocking the prismaclinet
// when we call prisma.sum.create it should return a mock function
// it we can't mock then the data will be saved in the database
// if we dont mock test then there is intergrate test, also testing database
// same way to mock redis
// vi.mock('../db', ()=>({
//     prisma: { 
//         sum: {
//             create: vi.fn()
//         }
//     }
// } ))


vi.mock('../db');

describe("GET/ sum",()=>{
    it("test-1 it should return valid sum", async()=>{
        prisma.calculation.create.mockResolvedValue({ result: 2, id: 2, type: "Sum", a: 1, b: 1 })
        const res = await request(app).get('/sum').send({
            a: 2,
            b: 1
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(2);
        expect(res.body.result).toBe(3);
    })

    it("test-2 it should return invalid valid sum as sending string", async()=>{
        prisma.calculation.create.mockResolvedValue({ result: 2, id: 2, type: "Sum", a: 1, b: 1 })
        const res = await request(app).get('/sum').send({
            a: "2",
            b: "-1"
        });

        expect(res.statusCode).toBe(411);
        expect(res.body.result).toBe("Invalid Inputs");
    })
})

describe("Post/ multiply", ()=>{
    it("multiply testing", ()=>{

    })
})