import Characteristics from '../../models/Characteristics';
import Genders from '../../types/Genders';

type Props = {
  x: number,
  y: number,
  gender: Genders | false,
  onFieldSelect: (x: number, y: number) => void,
  characteristics: Characteristics | false,
  isSelected: boolean,
  isAvailable: boolean,
}

export default Props;
