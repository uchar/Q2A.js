import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const Q2AMenu = ({ open, onClose, items, onItemClick, anchorEl }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
    >
      {items.map((item) => {
        return (
          <MenuItem key={item.name} onClick={() => onItemClick(item.name)}>
            {item.name}
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default Q2AMenu;
