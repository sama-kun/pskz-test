import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React from "react";

interface UploadAreaProps {
  onFileChange: (file: File) => void;
}

const { Dragger } = Upload;

const UploadArea: React.FC<UploadAreaProps> = ({ onFileChange }) => {
  const handleFileChange = (info: any) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      onFileChange(info.file.originFileObj);
    }
  };

  return (
    <Dragger
      accept="image/*"
      beforeUpload={(file) => {
        onFileChange(file);
        return false; // Prevent automatic upload
      }}
      onChange={handleFileChange}
      showUploadList={false}
      style={{ padding: 20, borderRadius: 8 }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Перетащи файл или нажми, чтобы выбрать</p>
    </Dragger>
  );
};

export default UploadArea;
