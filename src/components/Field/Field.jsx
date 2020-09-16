import React from 'react';
import PropTypes from 'prop-types';
import Genders from '../../models/Genders';
import classNames from '../../utils/classNames';
import FieldTypes from '../../models/FieldTypes';
import Characteristics from '../../models/Characteristics';

const characteristicTypeToName = {
  [Characteristics.FAT]: 'fat',
  [Characteristics.SHORT]: 'short',
  [Characteristics.SLIM]: 'slim',
  [Characteristics.TALL]: 'tall',
};

const Field = ({
  x,
  y,
  gender,
  onFieldSelect,
  type: fieldType,
  characteristics,
}) => {
  const isSelected = fieldType === FieldTypes.SELECTED || fieldType === FieldTypes.NEXT_JUMP;
  const isAvailable = fieldType === FieldTypes.AVAILABLE || fieldType === FieldTypes.NEXT_JUMP;

  return (
    <td>
      <label
        className={classNames([
          gender && 'frog',
          gender === Genders.FEMALE && 'female',
          gender === Genders.MALE && 'male',
        ])}
        style={{ border: isAvailable ? '5px solid yellow' : null }}
      >
        {
          characteristics.map((characteristic) => (
            <span>
              {characteristicTypeToName[characteristic]}
              <br />
            </span>
          ))
        }
        <input checked={isSelected} type="checkbox" onChange={() => onFieldSelect(x, y)} />
      </label>
    </td>
  );
};

Field.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onFieldSelect: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    FieldTypes.AVAILABLE,
    FieldTypes.SELECTED,
    FieldTypes.NONE,
    FieldTypes.FROG,
    FieldTypes.NEXT_JUMP,
  ]).isRequired,
  gender: PropTypes.oneOf([Genders.FEMALE, Genders.MALE]),
  characteristics: PropTypes.arrayOf(PropTypes.string),
};

Field.defaultProps = {
  gender: null,
  characteristics: [],
};

export default Field;
