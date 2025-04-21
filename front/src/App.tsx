// App.tsx
import { ApolloProvider } from "@apollo/client";
import { Button, Card, Layout, message, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";
import client from "./graphql/apolloClient";
import { useImageStore } from "./state/useImageStore";

import styles from "./App.module.scss";
import ImagePreview from "./components/ImagePreview/ImagePreview";
import UploadArea from "./components/UploadArea/UploadArea";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { setUploading, setImageUrl, setProgress } = useImageStore();

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("Please select an image to upload");
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          }
        },
      });

      setImageUrl(response.data.url);
      message.success("Upload successful!");
    } catch (error) {
      message.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Title level={2}>Image Upload App</Title>
        </Header>

        <Content className={styles.content}>
          <Card className={styles.card} variant="borderless">
            <ProgressIndicator />
            <ImagePreview file={file} />
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={!file}
              style={{ marginTop: 16 }}
            >
              Upload
            </Button>
          </Card>

          <UploadArea onFileChange={handleFileChange} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default App;
