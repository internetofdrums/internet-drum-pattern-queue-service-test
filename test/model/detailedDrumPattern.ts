import {UniversallyUnique} from "./universallyUnique";
import {Named} from "./named";
import {DrumPatternData} from "./drumPatternData";

export interface DetailedDrumPattern extends UniversallyUnique, Named, DrumPatternData {
}
