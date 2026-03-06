import React, { useState } from "react";
import { ArrowLeft, Sparkles, AlertCircle, ChevronRight, Layers } from "lucide-react";
import UploadBox from "./UploadBox";
import CameraModal from "./CameraModal";
import { scanSingleCard } from "./scanService";
import imageCompression from "browser-image-compression";

export default function SingleScan({
  onBack,
  onBulk,
  setStep,
  setContactData,
  captureMethod,
}) {

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [activeSide, setActiveSide] = useState(null);

  // IMAGE COMPRESSION
  const compressImage = async (file) => {

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1600,
      initialQuality: 0.8,
      useWebWorker: true
    };

    try {

      const compressed = await imageCompression(file, options);

      console.log(
        "Original:",
        (file.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      console.log(
        "Compressed:",
        (compressed.size / 1024 / 1024).toFixed(2),
        "MB"
      );

      return compressed;

    } catch (err) {

      console.error(err);
      return file;

    }
  };


  // FRONT FILE CHANGE
  const handleFrontChange = async (e) => {

    const f = e.target.files?.[0];
    if (!f) return;

    const compressed = await compressImage(f);

    updateFrontPhoto(compressed);

  };


  // BACK FILE CHANGE
  const handleBackChange = async (e) => {

    const f = e.target.files?.[0];
    if (!f) return;

    const compressed = await compressImage(f);

    updateBackPhoto(compressed);

  };


  // UPDATE FRONT IMAGE
  const updateFrontPhoto = (file) => {

    setFrontImage(file);
    setFrontPreview(URL.createObjectURL(file));
    setError("");

  };


  // UPDATE BACK IMAGE
  const updateBackPhoto = (file) => {

    setBackImage(file);
    setBackPreview(URL.createObjectURL(file));

  };


  // OPEN CAMERA
  const openCamera = (side) => {

    setActiveSide(side);
    setShowCamera(true);

  };


  // CAMERA CAPTURE
  const handleCapture = async (file) => {

    const compressed = await compressImage(file);

    if (activeSide === "front") {

      updateFrontPhoto(compressed);

    } else {

      updateBackPhoto(compressed);

    }

    setShowCamera(false);

  };


  // PROCESS SCAN
  const handleScan = async () => {

    if (!frontImage) {

      setError("Front side is required to proceed.");
      return;

    }

    try {

      setLoading(true);
      setError("");

      const data = await scanSingleCard(frontImage, backImage);

      if (data) {

        setContactData(data);
        setStep("results");

      }

    } catch {

      setError("AI analysis failed. Please check image clarity.");

    } finally {

      setLoading(false);

    }

  };


  const canScan = !!frontImage && !loading;


  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ss-wrap { animation: fadeUp 0.3s ease-out both; }

        @keyframes ss-spin { to { transform: rotate(360deg); } }
        .ss-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ss-spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .ss-btn:hover:not(:disabled) {
          box-shadow: 0 12px 28px rgba(245,166,35,0.44) !important;
          transform: translateY(-1px);
        }

        .ss-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        @media (max-width: 540px) {
          .ss-page { padding-top: 28px !important; padding-bottom: 48px !important; }
          .ss-h1 { font-size: 26px !important; }
          .ss-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .ss-back { display: none !important; }
          .ss-toprow { justify-content: center !important; }
        }
      `}</style>

      <div className="min-h-screen w-full bg-white relative overflow-hidden"
        style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

        <div className="pointer-events-none fixed top-0 right-0 w-72 h-72 rounded-full opacity-50"
          style={{ background: "#fffbeb", filter: "blur(80px)" }} />

        <div className="pointer-events-none fixed bottom-0 left-0 w-52 h-52 rounded-full opacity-25"
          style={{ background: "#eff6ff", filter: "blur(80px)" }} />

        <div className="ss-wrap ss-page max-w-[600px] mx-auto px-5 relative z-10"
          style={{ paddingTop: 52, paddingBottom: 64 }}>

          {showCamera && (
            <CameraModal
              onCapture={handleCapture}
              onClose={() => setShowCamera(false)}
            />
          )}

          {/* TOP ROW */}
          <div className="ss-toprow flex items-center justify-between mb-10 gap-3 flex-wrap">

            <button
              onClick={onBack}
              className="ss-back flex items-center gap-2 font-bold uppercase border-none bg-transparent cursor-pointer transition-colors"
              style={{ fontSize: 11, letterSpacing: "0.18em", color: "#9CA3AF" }}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="flex items-center rounded-full shadow-sm"
              style={{ background: "#fff", border: "1px solid #E5E7EB", padding: 5, gap: 3 }}>

              <button
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none"
                style={{
                  padding: "7px 20px",
                  fontSize: 12,
                  background: "#F5A623",
                  color: "#fff"
                }}
              >
                Single Scan
              </button>

              <button
                onClick={onBulk}
                className="flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap border-none cursor-pointer"
                style={{ padding: "7px 20px", fontSize: 12, color: "#9CA3AF" }}
              >
                <Layers size={12} />
                Bulk Scan
              </button>

            </div>

          </div>

          {/* HEADING */}
          <div className="mb-7">
            <h2 className="ss-h1 font-black text-gray-900 tracking-tight leading-tight m-0 mb-2"
              style={{ fontSize: 36 }}>

              {captureMethod === "camera" ? "Snap" : "Upload"} Your
              <span style={{ color: "#F5A623" }}> Business Card</span>

            </h2>

            <p className="font-semibold text-gray-400 uppercase m-0"
              style={{ fontSize: 11, letterSpacing: "0.18em" }}>
              AI-Powered OCR Extraction • Instant Results
            </p>
          </div>

          {/* UPLOAD GRID */}
          <div className="ss-grid grid mb-5"
            style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            <UploadBox
              preview={frontPreview}
              onFileChange={handleFrontChange}
              onRemove={() => { setFrontImage(null); setFrontPreview(null); }}
              onBoxClick={captureMethod === "camera" ? () => openCamera("front") : null}
            />

            <UploadBox
              preview={backPreview}
              onFileChange={handleBackChange}
              onRemove={() => { setBackImage(null); setBackPreview(null); }}
              onBoxClick={captureMethod === "camera" ? () => openCamera("back") : null}
            />

          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            onClick={handleScan}
            disabled={!canScan}
            className="ss-btn w-full flex items-center justify-center gap-2.5 border-none font-black uppercase"
            style={{
              height: 52,
              borderRadius: 14,
              fontSize: 12,
              background: canScan ? "#F5A623" : "#E5E7EB",
              color: canScan ? "#fff" : "#9CA3AF"
            }}
          >

            {loading ? (
              <>
                <div className="ss-spinner" />
                Processing Card...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Process Card
                <ChevronRight size={14} />
              </>
            )}

          </button>

        </div>

      </div>
    </>
  );
}