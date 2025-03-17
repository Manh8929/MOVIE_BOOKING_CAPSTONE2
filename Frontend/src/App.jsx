import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",fontSize: "30px",width: "100%",maxWidth: "1400px",margin: "auto",backgroundColor: "#f0f0f0",borderRadius: "10px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",}}>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Sung xấu vãi lòng
        </div>
        <div style={{ color: "#555", fontWeight: "bold" }}>
          con mịa lâm sung, mịa lâm sung
        </div>
      </div>
    </>
  );
}

export default App;
