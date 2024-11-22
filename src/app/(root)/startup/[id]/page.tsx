import axios from "axios";
import { notFound } from "next/navigation";

export const experimental_ppr = true;
export const revalidate = 60;       // enable ISG

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = (await axios(`http://localhost:8000/api/startups/${id}`)).data;
    if (!post) return notFound();
    
    return (
        <>
            <h1 className="text-3xl">{post.title}</h1>
        </>
    )
}

export default Page;