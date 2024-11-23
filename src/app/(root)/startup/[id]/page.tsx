import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;
// export const revalidate = 60;       // enable ISG for hole page

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const res = await fetch(`http://localhost:8000/api/startups/${id}`, {
        next: {
            revalidate: 60      // enable ISG for only fetch data
        }
    });
    const post = await res.json();
    if (!post) return notFound();

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post.createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
            <section className="section_container">
                <img 
                    src={post.image} 
                    alt="thumbnail" 
                    className="w-full h-auto rounded-xl"
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link 
                            href={`/user/${post.author._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image 
                                src={post.author.image} alt="avatar"
                                width={64} height={64}
                                className="rounded-full drop-shadow-lg"
                            />
                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                            </div>
                        </Link>
                        <p className="category-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold">Post Details</h3>
                    <p>{post.details}</p>
                </div>
                <hr className="divider" />

                {/* Dynamic Rendering */}
                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}

export default Page;