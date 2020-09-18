import Field from '../../models/Field';

type Props = {
    fields: Field[][];
    onFieldSelect: (x: number, y: number) => void
}

export default Props;
