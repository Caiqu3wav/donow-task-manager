import prisma from "@/app/utils/connect";
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
        console.log("ERROR CREATING TASK: ", error);
        return NextResponse.json({ error: "Error creating task", status: 500 });
    }
}

export async function GET(req: Request) {
    try{

    } catch (error) {
        console.log("ERROR GETTING TASK: ", error);
        return NextResponse.json({ error: "Error getting task", status: 500 });
    }
}

export async function PUT(req: Request) {
    try{

    } catch (error) {
        console.log("ERROR UPDATING TASK: ", error);
        return NextResponse.json({ error: "Error update task", status: 500 });
    }
}

export async function DELETE(req: Request) {
    try{

    } catch (error) {
        console.log("ERROR DELETING TASK: ", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 });
    }
}