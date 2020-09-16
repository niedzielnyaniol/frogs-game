import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

const Lake = ({
  lake,
  onFieldSelect,
}) => (
  <table id="lake">
    {
        lake.map((row) => (
          <tr>
            {
                row.map((field) => (
                  <Field {...field} onFieldSelect={onFieldSelect} />
                ))
            }
          </tr>
        ))
    }
  </table>
);

Lake.propTypes = {
  lake: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        gender: PropTypes.string,
        characteristics: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  ).isRequired,
  onFieldSelect: PropTypes.func.isRequired,
};

export default Lake;
