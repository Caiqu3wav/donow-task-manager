import prisma from "../../utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {userId} = auth();

        if (!userId){
            return NextResponse.json({ error: "Unauthorizated", status: 401 });
        }

        const {title, description, dte, completed, important} = await req.json();

        if (!title || !description || !dte) {
            return NextResponse.json({ error: "Missing required fields", 
            status: 400,
         });
        }

        if (title.length < 3){
            return NextResponse.json({
                error: "Título deve ter pelo menos 3 carácteres",
                status: 400,
            });
        }

        const task = await prisma.task.create({
            data: {
                title, 
                description, 
                dte,
                 isCompleted: completed,
                 isImportant: important,
                 userId,
            }
        });


        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: "Error creating task", status: 500 });
    }
}

export async function GET(req: Request) {
    try{
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.log("ERROR GETTING TASK: ", error);
        return NextResponse.json({ error: "Error getting task", status: 500 });
    }
}

export async function PUT(req: Request) {

    try{
        const { userId } = auth();
        const {isCompleted, id} = await req.json();
    
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                isCompleted,
            }
        });

        return NextResponse.json(task);
    } catch (error) {
        console.log("ERROR UPDATING TASK: ", error);
        return NextResponse.json({ error: "Error update task", status: 500 });
    }
}