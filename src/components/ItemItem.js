import React from "react";
import PropTypes from 'prop-types';

function ItemItem({ item, onDelete }) {
  return (
    <li>
      {item}
      <button onClick={onDelete} type="button">
        Remove
      </button>
    </li>
  );
}

ItemItem.defaultProps = {
  item: 'Nameless Item'
}

ItemItem.propTypes = {
  item: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}

export default ItemItem;