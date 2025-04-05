import connect from "@/lib/db"
import { Experience } from "@/models/experience"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAuth } from "@clerk/nextjs/server"

const experienceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    company: z.string().min(2, "Company name must be at least 2 characters long"),
    location: z.string().min(2, "Location must be at least 2 characters long"),
    from: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid from date",
    }),
    to: z.string().nullable().optional().refine((date) => !date || !isNaN(Date.parse(date)), {
        message: "Invalid to date",
    }),
    current: z.boolean().optional(),
    description: z.string().optional(),
})

export const GET = async () => {
    try {
        await connect()
        const experience = await Experience.find()
        return NextResponse.json({experience}, { status: 200 })
    } catch(error) {
        console.error(error)
        return NextResponse.json({message: 'Error fetching users'}, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = await getAuth(request)

        if (!userId) {
            return NextResponse.json({message: 'Unauthorized'}, { status: 401 })
        }

        const body = await request.json()

        const parsedBody = experienceSchema.safeParse(body)
        if (!parsedBody.success) {
            return NextResponse.json({ errors: parsedBody.error.format() }, { status: 400 })
        }

        await connect()
        const experience = await Experience.create({...parsedBody.data, userId: userId })
        await experience.save()
        return NextResponse.json({experience}, { status: 201 })
    } catch(error) {
        console.error(error)
        return NextResponse.json({message: 'Error creating user'}, { status: 500 })
    }
}