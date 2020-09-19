import React from 'react';
import Genders from '../../types/Genders';
import Characteristics from '../../models/Characteristics';
import classNames from '../../utils/classNames';
import Props from './Field.types';

const Field = ({
  x,
  y,
  gender,
  onClick,
  characteristics,
  isSelected,
  isAvailable,
}: Props):JSX.Element => (
  <td>
    <label
      className={classNames([
        gender && 'frog',
        gender === Genders.FEMALE && 'female',
        gender === Genders.MALE && 'male',
      ])}
      style={{ border: isAvailable ? '5px solid yellow' : undefined }}
    >
      {
        characteristics && (
          <>
            <span>
              {Characteristics.getName(characteristics.getHeightCharacteristic())}
              <br />
            </span>
            <span>
              {Characteristics.getName(characteristics.getWeightCharacteristic())}
            </span>
          </>
        )
      }
      <input checked={isSelected} type="checkbox" onChange={() => onClick(x, y)} />
    </label>
  </td>
);

export default Field;
