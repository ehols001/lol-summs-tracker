export default function Game({ params }: { params: { team_code: string }}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <p>Game {params.team_code}</p>
        </div>
    )
}
