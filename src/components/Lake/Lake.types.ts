import Field from '../../models/Field';
import Frog from '../../models/Frog';
import Origin from '../../models/Origin';

type Props = {
    selectedFrog: Frog | null
    availableMoves: Origin[],
    fields: Field[][];
    onFieldClick: (x: number, y: number) => void
}

export default Props;
