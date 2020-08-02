import { uploadFile } from '../../../API/utilities';
import { getFullUrl } from '../../utlities/generalUtilities';

export class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    console.log('IN CONSTRUCTOR');
  }

  // Starts the upload process.
  upload() {
    console.log('IN upload');

    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this.sendRequest(resolve, reject, file);
        })
    );
  }

  // Initializes XMLHttpRequest listeners.
  // eslint-disable-next-line max-lines-per-function,no-underscore-dangle
  _initListeners(resolve, reject, file) {
    console.log('in initlistner');
    const { xhr } = this;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const { response } = xhr;

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.url,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  // eslint-disable-next-line no-underscore-dangle
  sendRequest(resolve, reject, file) {
    const { loader } = this;
    uploadFile(file)
      .then((result) => {
        console.log('RESULT OF UPLOAD : ', result);
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
