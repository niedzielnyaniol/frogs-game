import React from 'react';
import Props from './Lake.types';
import Field from '../Field';
import Frog from '../../models/Frog';

const Lake = ({
  fields,
  onFieldSelect,
}: Props):JSX.Element => (
  <table id="lake">
    {
        fields.map((row) => (
          <tr>
            {
                row.map((field) => {
                  const origin = field.getOrigin();

                  return (
                    <Field
                      x={origin.x}
                      y={origin.y}
                      gender={field instanceof Frog && field.getGender()}
                      characteristics={
                        field instanceof Frog && field.getCharacteristics()
                      }
                      isSelected={false}
                      isAvailable={false}
                      onFieldSelect={onFieldSelect}
                    />
                  );
                })
            }
          </tr>
        ))
    }
  </table>
);

export default Lake;
