import { title } from "process";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
    searchParams: Promise<{ query?: string }>
}) {
    const query = (await searchParams).query;
    const posts = [{
        _createdAt: new Date(),
        views: 55,
        author: {
            _id: 1,
            name: 'John Sena'
        },
        _id: 1,
        description: 'This is a description',
        image: 'https://c.pxhere.com/images/d1/6d/20d6e315f9b0d6567b582f7c5423-1668138.jpg!d',
        category: "Robots",
        title: "My Robots"
    }]

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>
                <SearchForm query={query}/>
            </section>

            <section className="section_container">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : 'All Startups'}
                </p>

                <ul className="mt-7 card_grid">
                    {posts.length > 0 ? (
                        posts.map((post: StartupCardType, idx: number) => (
                            <StartupCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p className="no-result"></p>
                    )}
                </ul>
            </section>
        </>
    );
}
