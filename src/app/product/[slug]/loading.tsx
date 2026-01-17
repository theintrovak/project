export default function Loading() {
    return (
        <div className="p-6 grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="h-96 bg-gray-300 rounded-xl" />
            <div>
                <div className="h-8 bg-gray-300 w-3/4 mb-4" />
                <div className="h-6 bg-gray-300 w-1/2 mb-6" />
                <div className="h-4 bg-gray-300 w-full mb-2" />
                <div className="h-4 bg-gray-300 w-5/6" />
            </div>
        </div>
    );
}
