import {describe, expect, it} from '@jest/globals';
import request from "supertest";
import { app } from "../index";

// multiple test for same functionality
// descibe -> group of tests for functionality sum
describe("sum", ()=>{
    
    // sending an http request to the server
    it("should return the sum of two numbers test-1", async()=>{
        const res = await request(app).get('/sum').send({
            a: 1,
            b: 2
        }, );

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(3);
    })

    it("should return the sum of two numbers test-2", async()=>{
        const res = await request(app).get('/sum').send({
            a: 20,
            b: -10
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(10);
    })

    it("should return the sum of two numbers test-3", async()=>{
        const res = await request(app).get('/sum').send({
            a: "20",
            b: "-10"
        });

        expect(res.statusCode).toBe(411);
        expect(res.body.result).toBe("Invalid Inputs");
    })

    it("should return 411 if no inputs are provided text-4", async () => {
        const res = await request(app).get("/sum").send({});
        expect(res.statusCode).toBe(411);
        expect(res.body.result).toBe("Invalid Inputs");
    });

    it("shoud return the actual sum with test-5", async()=>{
        // setting up the headers in the request of supertest
        const res = await request(app).post("/sum").set({
            a: "22",
            b: "35"
        }).send({});
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe(57);  
    })

    it("shoud return the actual sum with test-6", async()=>{
        // setting up the headers in the request of supertest
        const res = await request(app).post("/sum").set({}).send({
            a: 22,
            b: 35
        });
        expect(res.statusCode).toBe(411);
        expect(res.body.result).toBe("Invalid Inputs");  
    })

});

// mocking database while testing as test unit should not change any data in the database
// jest -> vitest