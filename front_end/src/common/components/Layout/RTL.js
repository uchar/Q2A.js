import React from 'react';
import { create } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import rtl from 'jss-rtl';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

const RTL = (props) => <StylesProvider jss={jss}>{props.children}</StylesProvider>;

export default RTL;
