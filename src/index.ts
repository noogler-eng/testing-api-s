import express from "express";
import { prisma } from "./db";
import zod from "zod";

export const app = express();
app.use(express.json());

const sumObj = zod.object({
    a: zod.number(),
    b: zod.number()
});

console.log(prisma);

app.get("/sum", async(req, res)=>{
    try{
        const isParse = sumObj.safeParse(req.body);
        
        if(!isParse.success){
            res.status(411).json({
                result: "Invalid Inputs"
            });
            return;
        }

        const result: number =  isParse.data.a + isParse.data.b;    
        
        // this should mocked out
        const data = await prisma.sum.create({
            data: {
                a: isParse.data.a,
                b: isParse.data.b,
                sum: result
            }  
        })
        console.log(data);
        // until here


        return res.status(200).json({
            result: result
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error: "error"
        });
    }
})


app.post("/sum", async(req, res)=>{
    try{
        const isParse = sumObj.safeParse({
            a: Number(req.headers["a"]),
            b: Number(req.headers["b"])
        });

        if(!isParse.success){
            res.status(411).json({
                result: "Invalid Inputs"
            });
            return;
        }

        const result: number =  isParse.data.a + isParse.data.b;

        // this should mocked out
        const data = await prisma.sum.create({
            data: {
                a: isParse.data.a,
                b: isParse.data.b,
                sum: result
            }  
        })
        console.log(data);
        // until here

        return res.status(200).json({
            result: result
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error: "error"
        });
    }
})


// we are not listening to the server
// app.listen(8080, ()=>{
//     console.log("Server is running on port 8080")
// })