import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl';
import React from 'react';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default (props) => <StylesProvider jss={jss}>{props.children}</StylesProvider>;
