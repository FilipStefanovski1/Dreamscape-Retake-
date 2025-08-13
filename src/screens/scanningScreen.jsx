import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { classifyImage } from "../services/hf";

export default function ScanningScreen() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  const onAnalyze = async () => {
    if (!imageFile) {
      setErr("Please choose or take a picture first.");
      return;
    }
    setErr("");
    setLoading(true);
    try {
      const results = await classifyImage(imageFile); 
      navigate("/result", { state: { imageURL, results } });
    } catch (e) {
      setErr(e.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dp4-page">
      <h2>Scan an Image</h2>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"   
        onChange={onPick}
      />

      {imageURL ? (
        <div className="dp4-preview">
          <img src={imageURL} alt="preview" />
        </div>
      ) : null}

      {err && <div className="dp4-error">{err}</div>}

      <button className="dp4-button" onClick={onAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <p className="dp4-hint">Tip: On mobile, you can take a photo or pick from your gallery.</p>
    </section>
  );
}
