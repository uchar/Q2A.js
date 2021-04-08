import { uploadFile } from '../../../API/utilities';
import { getFullUrl } from '../../utlities/generalUtilities';

export class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this.sendRequest(resolve, reject, file);
        })
    );
  }

  sendRequest(resolve, reject, file) {
    const { loader } = this;
    uploadFile(file)
      .then((result) => {
        loader.uploaded = true;
        const url = getFullUrl(result.uploadFile.filename);
        resolve({
          default: url,
        });
      })
      .catch((error) => {
        reject(error.message);
      });
  }
}

export const CustomUploadAdapterPlugin = (editor) => {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new UploadAdapter(loader);
  };
};
