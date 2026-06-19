import React from "react";
import { IonSpinner } from "@ionic/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <IonSpinner />
    </div>
  );
};

export default LoadingSpinner;