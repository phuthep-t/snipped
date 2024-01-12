'use client';
import {db} from '@/db'
import {redirect} from "next/navigation";
import {useFormState} from 'react-dom';
import * as actions from '@/actions'


export default function CreateSnippet() {
    const [formState,action]=useFormState(actions.createSnippet,{message:''});

    return (
        <form action ={action}>
            <h3 className="font-bold m-3"> Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input name="title" className="border round p2 w-full" id="title"></input>
                </div>
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea name="code" className="border round p2 w-full" id="code"></textarea>
                </div>
                {
                    formState.message?<div className="my-2 p-2 bg-red-200 border rounded" >{formState.message}</div>: null
                }
                <button type="submit" className="border rounded p-2 bg-blue-200">Create</button>
            </div>

        </form>
    )
}
