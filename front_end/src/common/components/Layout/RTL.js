import React from 'react';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import rtl from 'jss-rtl';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export default (props) => <StylesProvider jss={jss}>{props.children}</StylesProvider>;
