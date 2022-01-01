import React, { PropsWithChildren, useRef, useState } from 'react';
import './FileUpload.css';

interface Props {
  title: string;
  maxFileSize: number;
  multiple: boolean;
  accept: string;
}

const Upload: React.FC<PropsWithChildren<Props>> = ({
  title,
  maxFileSize,
  ...rest
}) => {
  const fileInputField: React.LegacyRef<HTMLInputElement> = useRef(null);
  const [files, setFiles] = useState<Record<string, any>>({});
  const BytesToKB = (bytes: number) => Math.round(bytes / 1000);
  const addNewFiles = (newFiles: any) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSize) {
        if (!rest.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };
  const handleUploadClick = () => {
    if (fileInputField.current) fileInputField.current.click();
  };
  const handleNewFileUpload = (e: any) => {
    const { files: newFiles } = e.target;
    if (
      newFiles.length &&
      newFiles[0].type.split('/')[0] === rest.accept.split('/')[0]
    ) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
    } else {
      alert('Only accepting images');
    }
  };

  const removeFile = (fileName: string) => {
    delete files[fileName];
    setFiles({ ...files });
  };
  const handleFileSend = (e: any) => {
    e.preventDefault();
    console.log('Files to upload: ', files);
    //Upload logic to your favorite storage
  };
  return (
    <div id="upload-container">
      <form className="upload-area" onSubmit={handleFileSend}>
        <label htmlFor="uploader">{title}</label>
        <span>Drop your files here...</span>
        <input
          type="file"
          name="uploader"
          ref={fileInputField}
          title=""
          value=""
          onChange={handleNewFileUpload}
          {...rest}
        />
        <button type="button" onClick={handleUploadClick}>
          Upload file(s)
        </button>
        {Object.keys(files).length > 0 && (
          <button type="submit" className="upload-button">
            Upload
          </button>
        )}
      </form>
      <div
        className={`preview-area ${
          Object.keys(files).length > 0 ? 'active' : ''
        }`}
      >
        <h3>Preview</h3>
        <div className="preview-grid">
          {Object.keys(files).map((fileName, i) => {
            let file = files[fileName];
            let isImageFile = file.type.split('/')[0] === 'image';
            return (
              <section key={fileName} className="preview-image">
                <div>
                  {isImageFile && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${i}`}
                    />
                  )}
                  <div className="image-data">
                    <span>{file.name}</span>
                    <span>{BytesToKB(file.size)} kb</span>
                  </div>
                  <div
                    className="delete"
                    onClick={(e) => removeFile(file.name)}
                  >
                    x
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Upload;
