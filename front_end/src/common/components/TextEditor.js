import React from 'react';

export default class TextEditor extends React.Component {
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
    if (this.editor) {
      return (
        <this.ckEditor
          editor={this.editor}
          config={{
            language: {
              // The UI will be English.
              ui: 'fa',

              // But the content will be edited in Arabic.
              content: 'fa',
            },
          }}
          {...this.props}
        />
      );
    }
    return <div />;
  }
}
