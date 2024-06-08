import express from "express";
import { prisma } from "./db";

import zod from "zod";

export const app = express();
app.use(express.json());

const input = zod.object({
    a: zod.number(),
    b: zod.number()
});

console.log(prisma);

app.get("/sum", async(req, res)=>{
    try{
        const isParse = input.safeParse(req.body);
        
        if(!isParse.success){
            return res.status(411).json({
                result: "Invalid Inputs"
            });
        }

        const result: number =  isParse.data.a + isParse.data.b;    
        
        // this should mocked out
        const data = await prisma.calculation.create({
            data: {
                a: isParse.data.a,
                b: isParse.data.b,
                result: result,
                type: "Sum"
            }  
        })

        console.log(data);
        return res.status(200).json({
            result: result,
            id: data.id
        });
    }catch(error){
        return res.status(500).json({
            error: "error"
        });
    }
})


app.post("/sum", async(req, res)=>{
    try{

        // receiving data from headers
        const isParse = input.safeParse({
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
        const data = await prisma.calculation.create({
            data: {
                a: isParse.data.a,
                b: isParse.data.b,
                result: result,
                type: "Sum"
            }  
        })

        console.log(data);
        return res.status(200).json({
            result: result,
            id: data.id
        });
    }catch(error){
        return res.status(500).json({
            error: "error"
        });
    }
})


app.post('/multiply', async(req, res)=>{

   try{
    const parseObj = input.safeParse(req.body);
    if(!parseObj.success) {
        res.status(411);
        return res.json({          
            result: "Invalid Inputs"
        })
    }

    const a = parseObj.data.a;
    const b = parseObj.data.b;

    const result = a*b;
    const data = await prisma.calculation.create({
        data: {
            a: a,
            b: b,
            result: result,
            type: "Multiply"
        }
    })

    res.status(200);
    res.json({
        result: result,
        id: data.id
    })
   }catch(error){
    res.status(500)
    res.json({
        result: "error"
    })
   }
})


// we are not listening to the server
// app.listen(8080, ()=>{
//     console.log("Server is running on port 8080")
// })