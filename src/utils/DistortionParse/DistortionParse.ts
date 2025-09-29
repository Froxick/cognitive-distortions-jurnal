import { DistortionType } from "../../navigation/types/navigation";

export const DistortionParse = (uid: string, distortions: DistortionType[]) : DistortionType | null => {
    const find = distortions.find(el => el.id === uid)
    if(find) return find
    else return null
}