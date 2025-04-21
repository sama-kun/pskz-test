import { Image } from "antd";
import React from "react";

interface ImagePreviewProps {
  file: File | null;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
  if (!file) return null;

  return (
    <div style={{ marginTop: 16, width: 200, height: 200 }}>
      <Image
        src={URL.createObjectURL(file)}
        alt="Preview"
        width="100%"
        height="100%"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default ImagePreview;
