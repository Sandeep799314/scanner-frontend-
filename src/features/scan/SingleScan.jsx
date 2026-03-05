import React, { useState } from "react";
import { ArrowLeft, Sparkles, AlertCircle, ChevronRight } from "lucide-react";
import UploadBox from "./UploadBox";
import CameraModal from "./CameraModal";
import { scanSingleCard } from "./scanService";

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

  const handleFrontChange = (e) => {
    const file = e.target.files?.[0];
    if (file) updateFrontPhoto(file);
  };

  const handleBackChange = (e) => {
    const file = e.target.files?.[0];
    if (file) updateBackPhoto(file);
  };

  const updateFrontPhoto = (file) => {
    setFrontImage(file);
    setFrontPreview(URL.createObjectURL(file));
    setError("");
  };

  const updateBackPhoto = (file) => {
    setBackImage(file);
    setBackPreview(URL.createObjectURL(file));
  };

  const openCamera = (side) => {
    setActiveSide(side);
    setShowCamera(true);
  };

  const handleCapture = (file) => {
    if (activeSide === "front") {
      updateFrontPhoto(file);
    } else {
      updateBackPhoto(file);
    }
    setShowCamera(false);
  };

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

    } catch (err) {

      setError("AI analysis failed. Please check image clarity.");
      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col bg-[#FAF9F6] font-sans overflow-y-auto lg:overflow-hidden selection:bg-yellow-100">

      {showCamera && (
        <CameraModal
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}

      <div className="flex-1 flex flex-col items-center pt-6 md:pt-10 px-6 pb-16">

        <div className="w-full max-w-[560px] flex flex-col items-center">

          {/* BACK + TOGGLE */}
          <div className="flex items-center gap-4 justify-center mb-8">

            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-black font-bold text-[11px] uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm">
              <button className="px-6 py-2 rounded-full font-bold text-xs bg-gray-100 text-gray-900 shadow-inner">
                Single Scan
              </button>

              <button
                onClick={onBulk}
                className="flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs text-gray-400 hover:text-gray-600 transition-all"
              >
                Bulk Scan
              </button>
            </div>

          </div>

          {/* HEADING */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a1714] tracking-tight leading-tight">
              {captureMethod === "camera" ? "Snap" : "Upload"}{" "}
              <span className="text-[#eab308]">Assets.</span>
            </h2>

            <p className="text-gray-400 text-[10px] font-bold mt-3 uppercase tracking-[0.2em]">
              AI extraction for professional data
            </p>
          </div>

          {/* UPLOAD BOXES */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">

            <UploadBox
              label="Front View"
              required={true}
              preview={frontPreview}
              onFileChange={handleFrontChange}
              onRemove={() => {
                setFrontImage(null);
                setFrontPreview(null);
              }}
              onBoxClick={
                captureMethod === "camera"
                  ? () => openCamera("front")
                  : null
              }
            />

            <UploadBox
              label="Back View"
              preview={backPreview}
              onFileChange={handleBackChange}
              onRemove={() => {
                setBackImage(null);
                setBackPreview(null);
              }}
              onBoxClick={
                captureMethod === "camera"
                  ? () => openCamera("back")
                  : null
              }
            />

          </div>

          {/* ERROR */}
          {error && (
            <div className="w-full bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-3 text-red-500 mb-6">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">{error}</span>
            </div>
          )}

          {/* PROCESS BUTTON */}
        <div className="w-full flex justify-center">
  <button
    onClick={handleScan}
    disabled={loading || !frontImage}
    className={`group w-full md:w-[280px] h-[56px] flex items-center justify-center gap-4 rounded-[2rem] font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 relative overflow-hidden
    ${
      frontImage && !loading
        ? "bg-gray-900 text-white shadow-lg hover:bg-[#eab308] active:brightness-90"
        : "bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100"
    }`}
  >
    {/* Spinner aur Content dono ek hi container mein rahenge taaki layout jump na kare */}
    <div className="flex items-center justify-center gap-4">
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Sparkles
            size={16}
            className={frontImage ? "text-yellow-400" : "text-gray-300"}
          />
          <span>Process Card</span>
          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </>
      )}
    </div>
  </button>
</div>

          {/* FOOTER */}
          <div className="flex items-center gap-4 opacity-30 mt-12 pb-6">
            <div className="h-[1px] w-6 bg-gray-400"></div>

            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-600">
              Secure AI Cloud Processing
            </span>

            <div className="h-[1px] w-6 bg-gray-400"></div>
          </div>

        </div>

      </div>
    </div>
  );
}