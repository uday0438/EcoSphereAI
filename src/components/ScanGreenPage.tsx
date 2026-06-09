import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, X, Upload, ScanLine, Clock, Flame, Scan, Layers, Loader2, 
  Skull, Recycle, Droplets, Search, CheckCircle2, MessageCircle, 
  Send, Leaf, Minimize2, Mic, AlertTriangle, ChevronDown, ChevronUp, 
  Info, ArrowLeft, Zap
} from "lucide-react";
import { ProductAnalysisResult, RoomAuditResult, DetectedItem, ScanGreenChatMessage } from "../types";

// --- Frontend Helpers ---
const resizeImage = (base64Str: string, maxWidth = 800, maxHeight = 800): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
  });
};

const analyzeProductImage = async (base64Image: string): Promise<ProductAnalysisResult> => {
  const response = await fetch("/api/analyze-product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image }),
  });
  if (!response.ok) throw new Error("Product analysis failed");
  return await response.json();
};

const analyzeRoomImage = async (base64Image: string): Promise<RoomAuditResult> => {
  const response = await fetch("/api/analyze-room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image }),
  });
  if (!response.ok) throw new Error("Room audit failed");
  return await response.json();
};

const chatWithGreeny = async (history: ScanGreenChatMessage[], newMessage: string): Promise<string> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history, message: newMessage }),
  });
  if (!response.ok) throw new Error("Chat request failed");
  const data = await response.json();
  return data.text;
};

interface ScanGreenPageProps {
  onBack: () => void;
}

export function ScanGreenPage({ onBack }: ScanGreenPageProps) {
  const [activeTab, setActiveTab] = useState<"product" | "room">("product");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="min-h-screen hero-bg flex flex-col p-4 md:p-8 pb-32 text-white overflow-y-auto"
    >
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            aria-label="Back to landing"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-400" />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight text-white flex items-center gap-2">
              Eco Scan <span className="shimmer-text">Green 🔍</span>
            </h1>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
              Material Intelligence & Room Auditing AI
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="bg-slate-950/60 p-1 border border-white/10 rounded-full flex gap-1">
          <button
            onClick={() => setActiveTab("product")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === "product" 
                ? "bg-emerald-500 text-slate-950 shadow-lg" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Product Scanner
          </button>
          <button
            onClick={() => setActiveTab("room")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
              activeTab === "room" 
                ? "bg-emerald-500 text-slate-950 shadow-lg" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Room Audit
          </button>
        </div>
      </div>

      {/* Main Panels */}
      <div className="max-w-5xl mx-auto w-full">
        {activeTab === "product" ? <ProductScannerView /> : <RoomAuditView />}
      </div>

      {/* Floating Chatbot Helper */}
      <GreenyChatbot />
    </motion.div>
  );
}

// ==========================================
// 1. PRODUCT SCANNER VIEW COMPONENT
// ==========================================
function ProductScannerView() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
        setIsCameraOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setError(null);
    setImage(null);
    setResult(null);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access blocked. Please check your browser permission settings.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const resizedBase64 = await resizeImage(image, 600, 600);
      const analysis = await analyzeProductImage(resizedBase64);
      setResult(analysis);

      // Save to local history for Analytics
      const history = JSON.parse(localStorage.getItem("scangreen_history") || "[]");
      history.push({
        type: "product",
        timestamp: new Date().toISOString(),
        score: analysis.eco_score,
        title: analysis.verdict
      });
      localStorage.setItem("scangreen_history", JSON.stringify(history.slice(-20)));

      // Add XP
      const currentXp = parseInt(localStorage.getItem("xp") || "0", 10);
      localStorage.setItem("xp", (currentXp + 50).toString());
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError("AI analysis timed out or failed. Check connection & API Key settings.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getScoreColor = (score: number) => {
    if (score < 40) return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]";
    if (score < 70) return "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]";
    return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]";
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
          <ScanLine className="w-6 h-6 text-emerald-400" /> Intelligent Product Scanner
        </h2>
        <p className="text-slate-400 font-medium text-sm mt-1">
          Verify product materials, identify plastics, and suggest green alternatives in real-time.
        </p>
      </div>

      {!result && (
        <div className="max-w-xl mx-auto space-y-6">
          {!isCameraOpen && !image && (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={startCamera} 
                className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-sm">Scan Product</h4>
                <p className="text-[10px] text-slate-500 mt-1">Using live camera</p>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-sm">Upload Photo</h4>
                <p className="text-[10px] text-slate-500 mt-1">From files or photos</p>
              </button>
            </div>
          )}

          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-4 rounded-[2rem] relative min-h-[300px] flex flex-col items-center justify-center">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-2xl flex items-center mb-4 text-xs font-semibold max-w-sm">
                <AlertTriangle className="w-4 h-4 mr-2 shrink-0" /> {error}
              </div>
            )}

            {(isCameraOpen || image) && (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full max-w-md mx-auto bg-black shadow-2xl">
                {isCameraOpen ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="absolute bottom-6 left-0 w-full flex justify-center items-center z-20">
                      <button 
                        onClick={capturePhoto} 
                        className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-transparent hover:bg-white/20 transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={image!} alt="Preview" className="w-full h-full object-cover" />
                    {!loading && (
                      <div className="absolute bottom-6 left-0 w-full flex justify-center">
                        <button 
                          onClick={handleAnalyze} 
                          className="bg-emerald-500 text-slate-950 font-black text-sm px-8 py-3 rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all flex items-center transform hover:scale-105 cursor-pointer"
                        >
                          <Zap className="w-4 h-4 mr-2" /> Analyze Product
                        </button>
                      </div>
                    )}
                    {loading && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center">
                        <Loader2 className="w-10 h-10 animate-spin mb-3 text-emerald-400" />
                        <span className="font-bold text-lg">Running Material Scan...</span>
                        <p className="text-slate-400 text-xs mt-1">Verifying synthetic polymer levels</p>
                      </div>
                    )}
                  </>
                )}
                <button 
                  onClick={reset} 
                  className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/80 z-30 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {!isCameraOpen && !image && (
              <div className="text-center p-8 opacity-60">
                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <ScanLine className="w-8 h-8 text-emerald-400/80" />
                </div>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">Upload an item photo or trigger the live camera scan to begin.</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      )}

      {/* Result UI */}
      {result && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-slate-900/40 border border-white/5 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <ScanLine className="w-32 h-32 text-emerald-400" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Material Safety Grade</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-display font-black text-white">{result.eco_score}%</span>
                <span className="text-sm text-slate-400">Eco Score</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider ${
              result.eco_score > 70 
                ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400" 
                : result.eco_score > 40
                  ? "bg-amber-500/10 border border-amber-500/25 text-amber-400"
                  : "bg-red-500/10 border border-red-500/25 text-red-400"
            }`}>
              {result.verdict}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-white/5 rounded-full mb-6 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(result.eco_score)}`}
              style={{ width: `${result.eco_score}%` }}
            ></div>
          </div>

          {/* Reasoning */}
          <div className="space-y-4 mb-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5"><Info className="w-4 h-4 text-emerald-400" /> AI Material Assessment</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{result.reasoning}</p>
          </div>

          {/* Alternatives */}
          {result.recommended_alternative && result.eco_score < 85 && (
            <div className="mb-6 p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Recommended Alternative</span>
                <p className="text-sm font-bold text-white mt-0.5">Switch to a {result.recommended_alternative}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">This completely bypasses the detected synthetic polymer footprint.</p>
              </div>
              <button 
                onClick={() => alert(`Searching alternatives for ${result.recommended_alternative}...`)}
                className="whitespace-nowrap px-5 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl shadow-md hover:bg-emerald-400 transition-all cursor-pointer"
              >
                Find Eco Brand
              </button>
            </div>
          )}

          {/* Concerns */}
          {result.concerns && result.concerns.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5 shrink-0" />
                <div>
                  <h5 className="font-bold text-red-400 text-sm">Identified Risks & Concerns</h5>
                  <p className="text-red-300/80 text-xs mt-1 leading-relaxed">
                    {result.concerns.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Technical Details Dropdown */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/40">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center text-slate-200 font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4 text-emerald-400 mr-2" /> Technical Composition Details
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-4 border-t border-white/5 space-y-3 bg-slate-950/20">
                {result.technical_details.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-slate-400 font-semibold text-xs">{item.label}</span>
                    <span className="text-white font-bold text-xs text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={reset} 
              className="text-emerald-400 font-bold text-xs hover:text-emerald-300 hover:underline cursor-pointer"
            >
              Scan Another Product
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// 2. ROOM AUDIT VIEW COMPONENT
// ==========================================
function RoomAuditView() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoomAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scannerModules = [
    { id: 1, name: "Polymer Heatmap", desc: "Plastic load visualization", icon: Layers, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: 2, name: "Ghost Carbon", desc: "Embedded CO₂ footprint", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { id: 3, name: "Decomposition", desc: "Material longevity rating", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: 4, name: "Toxin Detective", desc: "VOC & chemical assessment", icon: Skull, color: "text-red-400", bg: "bg-red-500/10" },
    { id: 5, name: "Faux-Natural Buster", desc: "Fake green detection", icon: Search, color: "text-purple-400", bg: "bg-purple-500/10" },
    { id: 6, name: "Circular Economy", desc: "Recycle potential vs dump", icon: Recycle, color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: 7, name: "Ocean Impact", desc: "Marine pollution equivalent", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/10" }
  ];

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setError(null);
    setImage(null);
    setResult(null);
    setShowHeatmap(false);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Camera access blocked. Please check your browser permission settings.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
        setShowHeatmap(false);
        setIsCameraOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudit = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const resizedBase64 = await resizeImage(image, 800, 800);
      const analysis = await analyzeRoomImage(resizedBase64);
      setResult(analysis);
      setShowHeatmap(true);

      // Save to local history for Analytics
      const history = JSON.parse(localStorage.getItem("scangreen_history") || "[]");
      history.push({
        type: "room",
        timestamp: new Date().toISOString(),
        score: 100 - analysis.plastic_load,
        title: `Room Audit: ${analysis.plastic_load}% Plastic`
      });
      localStorage.setItem("scangreen_history", JSON.stringify(history.slice(-20)));

      // Add XP
      const currentXp = parseInt(localStorage.getItem("xp") || "0", 10);
      localStorage.setItem("xp", (currentXp + 100).toString());
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setError("AI environment audit failed. Ensure correct file size and API configurations.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setShowHeatmap(false);
    setError(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getToxinBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400";
      case "Medium": return "bg-amber-500/10 border border-amber-500/20 text-amber-400";
      case "High": return "bg-red-500/10 border border-red-500/20 text-red-400";
      case "Severe": return "bg-red-600/20 border border-red-600/40 text-red-300 animate-pulse";
      default: return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scan className="w-6 h-6 text-emerald-400" /> Environment Audit
          </h2>
          <p className="text-slate-400 font-medium text-sm mt-1">
            Perform a 7-point sustainability audit of the surrounding workspace or room.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-950 border border-white/10 px-4 py-2 rounded-full text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-slate-300 tracking-wider">SYSTEM ONLINE</span>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-50 bg-slate-950/90 border border-white/5 backdrop-blur-2xl rounded-[2rem] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanLine className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Auditing Environment...</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-xs leading-relaxed">
            Running 7-point scan: parsing polymer structures, calculating carbon footprint, and checking chemical VOC hazards.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AR Viewport */}
        <div className="lg:col-span-2 space-y-6">
          {!isCameraOpen && !image && (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={startCamera} 
                className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-5 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-xs">Scan Room</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Live Camera Feed</p>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-5 rounded-3xl flex flex-col items-center justify-center hover:bg-white/5 transition-all group cursor-pointer"
              >
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-bold text-white text-xs">Upload Photo</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Gallery Upload</p>
              </button>
            </div>
          )}

          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-2 rounded-[2rem] relative min-h-[300px] flex flex-col justify-center overflow-hidden">
            {(isCameraOpen || image) && !loading && (
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                <div className="bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border border-white/10 flex items-center">
                  <Scan className="w-3 h-3 mr-1.5 text-red-500" />
                  {isCameraOpen ? "LIVE CAM" : (result ? "SCAN DONE" : "AUDIT SOURCE")}
                </div>
                {result && (
                  <button 
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className="pointer-events-auto bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/10 flex items-center cursor-pointer transition-colors"
                  >
                    <Layers className="w-3 h-3 mr-1.5 text-emerald-400" />
                    Heatmap: {showHeatmap ? "ON" : "OFF"}
                  </button>
                )}
              </div>
            )}

            {!isCameraOpen && !image && (
              <div className="text-center p-12 opacity-60">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Camera className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-400 text-xs">Capture or upload an image to map the space.</p>
              </div>
            )}

            {isCameraOpen && (
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-6 left-0 w-full flex justify-center items-center z-30">
                  <button 
                    onClick={capturePhoto} 
                    className="w-14 h-14 rounded-full border-4 border-white flex items-center justify-center bg-transparent hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white rounded-full"></div>
                  </button>
                </div>
                <button 
                  onClick={reset} 
                  className="absolute top-6 right-6 z-30 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {image && !isCameraOpen && (
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
                <img 
                  src={image} 
                  alt="Room View" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    showHeatmap ? "opacity-50" : "opacity-90"
                  }`} 
                />

                {result && showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none p-4">
                    {/* Bounding box mock overlay tags */}
                    <div className="absolute top-[20%] left-[15%] flex flex-wrap gap-2 max-w-[70%]">
                      {result.detected_items.map((item, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx}
                          className={`backdrop-blur-md px-2.5 py-1 rounded-xl border text-[9px] font-black shadow-lg flex items-center ${
                            item.status === "Bad" 
                              ? "bg-red-500/80 border-red-400 text-white" 
                              : "bg-emerald-500/80 border-emerald-400 text-white"
                          }`}
                          style={{
                            marginLeft: `${(idx * 25) % 80}px`,
                            marginTop: `${(idx * 20) % 60}px`
                          }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status === "Bad" ? "bg-red-300" : "bg-emerald-300"}`} />
                          {item.name} ({item.material})
                        </motion.div>
                      ))}
                    </div>
                    {/* Heatmap overlay glow */}
                    <div 
                      className="absolute inset-0 mix-blend-color-dodge opacity-20 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${result.plastic_load > 45 ? "red" : "green"}, transparent 75%)`
                      }}
                    />
                  </div>
                )}

                <button 
                  onClick={reset} 
                  className="absolute top-6 right-6 z-30 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {image && !isCameraOpen && !result && (
            <button
              onClick={handleAudit}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center tracking-wider text-sm cursor-pointer"
            >
              <Zap className="w-4 h-4 mr-2" /> INITIATE environment AUDIT
            </button>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>Audit Modules Complete</span>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black uppercase">
                  OK
                </span>
              </h3>

              {/* Polymer Heatmap Summary */}
              <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl border-l-4 border-l-emerald-500">
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">1. Polymer Heatmap</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display font-black text-white">{result.plastic_load}%</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    result.plastic_load > 50 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                  }`}>
                    {result.plastic_load > 50 ? "High Synthetics" : "Low Plastic Load"}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full ${result.plastic_load > 50 ? "bg-red-500" : "bg-emerald-500"}`} 
                    style={{ width: `${result.plastic_load}%` }}
                  />
                </div>
              </div>

              {/* Grid Modules */}
              <div className="grid grid-cols-2 gap-3">
                {/* Ghost Carbon */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-orange-400">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">2. Ghost Carbon</span>
                  </div>
                  <div className="text-lg font-black text-white">{result.ghost_carbon}</div>
                  <p className="text-[9px] text-slate-500 mt-1 leading-tight">Embedded CO₂ from factory manufacturing.</p>
                </div>

                {/* Decomposition */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-amber-400">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">3. Lifespan</span>
                  </div>
                  <div className="text-lg font-black text-white">{result.decomposition_time}</div>
                  <p className="text-[9px] text-slate-500 mt-1 leading-tight">{result.decomposition_item} decay rate.</p>
                </div>

                {/* Toxin Detective */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-red-500">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                    <Skull className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">4. Toxins</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${getToxinBadgeColor(result.toxin_risk)}`}>
                    {result.toxin_risk} Risk
                  </span>
                  <p className="text-[9px] text-slate-500 mt-1.5 leading-tight line-clamp-2">{result.toxin_warning}</p>
                </div>

                {/* Faux Natural */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-purple-400">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Search className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">5. Faux-Natural</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{result.faux_natural_verdict}</div>
                  <p className="text-[9px] text-slate-500 mt-1 leading-tight">Greenwashed/synthetic texture identifier.</p>
                </div>

                {/* Circular Econ */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-blue-400">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Recycle className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">6. Circularity</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{result.circular_economy_status}</div>
                  <p className="text-[9px] text-slate-500 mt-1 leading-tight">Landfill bound vs reusable materials.</p>
                </div>

                {/* Ocean Impact */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl border-l-2 border-l-cyan-400">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[8px] font-bold uppercase tracking-wider">7. Ocean Strain</span>
                  </div>
                  <div className="text-lg font-black text-white">{result.ocean_impact}</div>
                  <p className="text-[9px] text-slate-500 mt-1 leading-tight">Equivalent weight in plastic straws burden.</p>
                </div>
              </div>

              <button 
                onClick={reset} 
                className="w-full text-center text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-white/5 border border-white/10 p-3 rounded-xl transition-colors cursor-pointer"
              >
                Perform New Environment Audit
              </button>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col bg-slate-900/40 border border-white/5 rounded-[2rem] p-6 text-center border-dashed">
              <h3 className="text-sm font-bold text-white flex items-center justify-center gap-2 mb-4">
                <ScanLine className="w-4 h-4 text-emerald-400" /> Scanner Audit Modules
              </h3>
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1">
                {scannerModules.map((module) => (
                  <div key={module.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/40 border border-white/5 text-left">
                    <div className={`p-2 rounded-lg ${module.bg} ${module.color}`}>
                      <module.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{module.name}</div>
                      <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">{module.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-4">
                Ready for image scan. Initiating will map components dynamically using computer vision.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. GREENY AI FLOATING VOICE CHATBOT
// ==========================================
function GreenyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ScanGreenChatMessage[]>([
    { role: "model", text: "Hi! I'm Greeny 🌱, your material coach. Ask me anything about ScanGreen or how to live plastic-free!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Voice output (TTS)
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05; // Slightly friendly green voice pitch
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice input (STT)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSendMessageDirectly(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSendMessageDirectly = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: ScanGreenChatMessage = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const responseText = await chatWithGreeny(messages, text);
      setMessages(prev => [...prev, { role: "model", text: responseText }]);
      speakText(responseText);
    } catch (err) {
      const errText = "My green cloud is slightly offline. Let's try again in a bit! 🌱";
      setMessages(prev => [...prev, { role: "model", text: errText }]);
      speakText(errText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    await handleSendMessageDirectly(inputValue);
  };

  return (
    <div className="fixed bottom-28 right-8 z-[60] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[330px] sm:w-[360px] h-[450px] bg-slate-950/90 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-white/5 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/10 p-2 rounded-full border border-emerald-500/25">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white">Greeny AI Assistant</h3>
                  <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Voice Active
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-xs leading-relaxed rounded-2xl ${
                      msg.role === "user" 
                        ? "bg-emerald-500 text-slate-950 rounded-br-none font-bold" 
                        : "bg-white/5 text-slate-200 border border-white/5 rounded-bl-none font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-2 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-white/5">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Greeny about polymer levels..." 
                  className="w-full pl-3 pr-20 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-200 placeholder:text-slate-500"
                />
                
                <div className="absolute right-1.5 flex gap-1">
                  <button 
                    type="button"
                    onClick={startListening}
                    disabled={isLoading}
                    className={`p-1.5 rounded-lg transition-all ${
                      isListening 
                        ? "bg-red-500 text-white animate-pulse" 
                        : "bg-white/5 text-emerald-400 hover:bg-white/10"
                    } cursor-pointer`}
                    title="Talk to Greeny"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>

                  <button 
                    type="submit" 
                    disabled={!inputValue.trim() || isLoading}
                    className="p-1.5 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 disabled:opacity-30 transition-all cursor-pointer"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer ${
          isOpen ? "bg-slate-900 rotate-90 border border-white/10 text-white" : "bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 animate-bounce-slow"
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-6 h-6 text-slate-950" />
        )}
      </button>
    </div>
  );
}
