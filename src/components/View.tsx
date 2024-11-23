import Ping from "./Ping"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const View = async ({ id }: { id: string }) => {
    // await delay(2000);      // Test: Chờ 2 giây trước khi gọi API

    const res = await fetch(`http://localhost:8000/api/startups/views/${id}`, {
        method: 'GET',
        cache: 'no-store'   // enable Dynamic Rendering
    })
    const post = await res.json();
    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black">Views: {post.views}</span>
            </p>
        </div>
    )
}

export default View