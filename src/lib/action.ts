"use server";

import { auth } from "@/app/auth";
import { parseServerActionResponse } from "./utils";

export const createPost = async (state: any, form: FormData) => {
    const session = await auth();
    if (!session) {
        return parseServerActionResponse({
            error: 'Not signed in',
            status: 'ERROR'
        });
    }
    const {title, description, category, link, details } = Object.fromEntries(Array.from(form));
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            author: session.id,
            details
        };
        const resposne = await fetch('http://localhost:8000/api/startup/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...startup
            })
        })
        const result = await resposne.json();
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error,
            status: 'ERROR'
        });
    }
}