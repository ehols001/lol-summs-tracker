'use client'

import React from "react"

export const TeamContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>] | undefined>(undefined);

export default function TeamProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [teamNum, setTeamNum] = React.useState(1);

    return (
        <TeamContext.Provider value={[teamNum, setTeamNum]}>
            {children}
        </TeamContext.Provider>
    )
}

export function useTeamContext() {
    const context = React.useContext(TeamContext);
    if(context === undefined) {
        throw new Error('useTeamContext must be used within a TeamProvider');
    }
    return context;
}