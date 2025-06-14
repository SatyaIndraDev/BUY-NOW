import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function LoaderComponent() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb", // gray-50
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "64px",
          height: "64px",
        }}
      >
        <Loader2
          style={{
            width: "32px",
            height: "32px",
            color: "#ec4899", // pink-500
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
