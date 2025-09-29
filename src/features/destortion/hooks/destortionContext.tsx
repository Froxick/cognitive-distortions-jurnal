import React, { createContext, useContext } from "react";
import { DistortionType } from "../../../navigation/types/navigation";
import { useDistortions } from "../../../hooks/useDestortion";

interface DistortionContextType {
    distortions: DistortionType[],
    loading: boolean,
    errors: string | null
}

const DistortionContext = createContext<DistortionContextType>({
    distortions: [],
    loading: true,
    errors: null
})
export const useDistortionContext = () => useContext(DistortionContext)

export const DistrotionProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const {distortions,loading,errors} = useDistortions()

    return(
        <DistortionContext.Provider value={{distortions,loading,errors}}>
            {children}
        </DistortionContext.Provider>
    )
}


