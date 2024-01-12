'use server';

import {db} from '@/db';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function editSnippet(id: number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code}
    })
    return redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: {id}
    })
    revalidatePath('/')
    redirect('/')
}


export async function createSnippet(formState: { message: string }, formData: FormData) {
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title Must be longer'
            }
        }
        if (typeof code !== 'string' || code.length < 3) {
            return {
                message: 'Code Must be longer'
            }
        }
        await db.snippet.create({
            data: {
                title,
                code
            }
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Unknow errors'
            }
        }

    }
    revalidatePath('/')
    redirect('/')

}
