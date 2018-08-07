import {IDrumPatternData} from "./drumPatternData";
import {INamed} from "./named";
import {IUniversallyUnique} from "./universallyUnique";

export interface IDetailedDrumPattern extends IUniversallyUnique, INamed, IDrumPatternData {
}
