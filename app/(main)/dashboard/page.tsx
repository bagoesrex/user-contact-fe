import CreateCard from "./_components/create-card";

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto w-full mt-14 py-2 px-2 gap-3">
            <CreateCard />
            <CreateCard />
            <CreateCard />
        </div>
    )
}