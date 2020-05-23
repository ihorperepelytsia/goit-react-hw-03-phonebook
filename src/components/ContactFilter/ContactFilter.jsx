import React from 'react';
import PropTypes from 'prop-types';

const ContactFilter = ({ value, onChangeFilter }) => (
  <>
    <label>
      Find Contacts by Name
      <input
        type="text"
        value={value}
        onChange={onChangeFilter}
        placeholder="Type to filter contact..."
      />
    </label>
  </>
);

ContactFilter.propType = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
export default ContactFilter;
