import {db} from '@/db'
import {notFound} from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions"

interface SnippetShowPageProps {
    params: {
        id: string
    }
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {

    const snippet =await  db.snippet.findFirst({
        where: {id: parseInt(props.params.id)}
    });

    if(!snippet) {
        return notFound();
    }

    const deleteSnippetAction = actions.deleteSnippet.bind(null,snippet.id);

    return (
    <div>
        <div className="flex m-4 justify-between items-center gap-4">
            <h1 className="text-xl font-bold">{snippet.title}</h1>
            <div className="flex gap-4">
                <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                <form action={deleteSnippetAction}>
                    <button className="p-2 border rounded" type="submit">Delete</button>
                </form>
            </div>
        </div>
        <pre className="p-3 border rounded border-gray-200">
            <code>{snippet.code}</code>
        </pre>
    </div>)
}
