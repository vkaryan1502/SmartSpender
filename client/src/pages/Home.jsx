import Navbar from '../components/Navbar'

function Home() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-smoky px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-primary mb-6">
                        Welcome, User👋
                    </h1>

                </div>
            </div>
        </>
    )
}

export default Home
