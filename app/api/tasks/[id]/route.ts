import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";

export async function DELETE(req: Request, { params }: { params: { id: string } } 
    ){
    try {
        const {userId} = auth();
        const { id } = params;

        if (!userId){
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        }

        const task = await prisma.task.delete({
            where: {
                id,
            },
        })

        console.log("Task deletada", task);
    } catch (error) {
        console.log("ERRO DELETANDO TASK:", error);
        return NextResponse.json({ error: "Error deleting task", status: 500 })
    }
}