import StartupCard, { StartupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
    const response = await fetch(`http://localhost:8000/api/user/getPosts/${id}`)
    const startups = (await response.json()) as [];
    return (
        <>
            {startups.length > 0 ? startups.map((startup: StartupCardType) => (
                <StartupCard key={startup._id} post={startup} />
            )) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    )
}

export default UserStartups;