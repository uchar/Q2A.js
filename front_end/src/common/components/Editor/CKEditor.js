import React from 'react';
import { CustomUploadAdapterPlugin } from './UploadAdapter';

export default class CKEditor extends React.Component {
  componentDidMount() {
    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      // eslint-disable-next-line global-require
      this.ckEditor = require('@ckeditor/ckeditor5-react');
      // eslint-disable-next-line global-require
      this.editor = require('ckeditor5-build-7khatcode');
      this.setState({ loadFinished: true });
    }
  }

  render() {
    const { toolbar } = this.props;
    const config = {
      language: {
        // The UI will be English.
        ui: 'fa',

        // But the content will be edited in Arabic.
        content: 'fa',
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
