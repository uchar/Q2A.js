import React from 'react';
import { CustomUploadAdapterPlugin } from './UploadAdapter';
import { getLanguage } from '../../utlities/languageUtilities';

export default class CKEditor extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      // eslint-disable-next-line global-require
      this.ckEditor = require('@ckeditor/ckeditor5-react').CKEditor;
      // eslint-disable-next-line global-require
      this.editor = require('ckeditor5-build-q2a.js');
      this.setState({ loadFinished: true });
    }
  }

  render() {
    const { toolbar } = this.props;
    const config = {
      language: {
        ui: getLanguage(),
        content: getLanguage(),
      },
      extraPlugins: [CustomUploadAdapterPlugin],
    };
    if (toolbar) config.toolbar = toolbar;
    if (this.editor) {
      return <this.ckEditor editor={this.editor} config={config} {...this.props} />;
    }
    return <div />;
  }
}
