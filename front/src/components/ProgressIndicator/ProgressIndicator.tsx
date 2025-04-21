import { Progress } from "antd";
import { useImageStore } from "../../state/useImageStore";
import styles from "./ProgressIndicator.module.scss";

const ProgressIndicator = () => {
  const { uploading, progress } = useImageStore();

  if (!uploading) return null;

  return (
    <div className={styles["progress-indicator"]}>
      <Progress
        type="circle"
        percent={progress}
        status="active"
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
      />
      <p>Uploading... {progress}%</p>
    </div>
  );
};

export default ProgressIndicator;
