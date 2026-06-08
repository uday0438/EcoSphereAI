import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, Activity, Car, Home, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

// Pure calculation helper localized for India's grid and transit metrics
export function calculateEmissions(
  carKm: number,
  twoWheelerKm: number,
  autoKm: number,
  energy: number,
  diet: number,
  baseline: number = 2.8 // Urban Indian middle-class baseline footprint (Tons/year)
) {
  // Indian Specific Emission Coefficients:
  // Petrol/CNG Car average: 0.143 kg CO2/km
  // Two-wheeler (Scooter/Motorcycle): 0.044 kg CO2/km
  // CNG Auto-rickshaw: 0.065 kg CO2/km
  // CEA Electricity Grid intensity: 0.82 kg CO2/kWh (coal heavy grid)
  // Meat meal average carbon factor: 4.5 kg CO2/meal
  const carEmissions = (carKm * 365 * 0.143) / 1000;
  const twoWheelerEmissions = (twoWheelerKm * 365 * 0.044) / 1000;
  const autoEmissions = (autoKm * 365 * 0.065) / 1000;
  const energyEmissions = (energy * 365 * 0.82) / 1000;
  const dietEmissions = (diet * 52 * 4.5) / 1000;
  
  const totalOffset = carEmissions + twoWheelerEmissions + autoEmissions + energyEmissions + dietEmissions + 0.8; // 0.8 static baseline (breathing, waste, etc.)
  const footprintString = totalOffset.toFixed(1);
  const projectedNum = parseFloat(footprintString);
  const diff = baseline - projectedNum;
  const isBetter = diff > 0;

  return {
    projectedFootprint: footprintString,
    projectedNum,
    diff,
    isBetter
  };
}

export function SimulatorCard() {
  const [car, setCar] = useState(15); // Car km/day
  const [twoWheeler, setTwoWheeler] = useState(10); // Two-wheeler km/day
  const [autoRickshaw, setAutoRickshaw] = useState(5); // Auto-rickshaw km/day
  const [energy, setEnergy] = useState(12); // kWh/day
  const [diet, setDiet] = useState(2); // High carbon meals/week
  
  // Telemetry Mock sync states
  const [isMeterSynced, setIsMeterSynced] = useState(false);
  const [isFitSynced, setIsFitSynced] = useState(false);

  // Baseline carbon footprint (Tons/year) for urban Indian average
  const baseline = 2.8;
  
  const calculations = useMemo(() => {
    return calculateEmissions(car, twoWheeler, autoRickshaw, energy, diet, baseline);
  }, [car, twoWheeler, autoRickshaw, energy, diet]);

  const { projectedFootprint, projectedNum, diff, isBetter } = calculations;

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col group relative overflow-hidden text-slate-100">
      
      {/* Background visualization representing intensity */}
      <motion.div 
        animate={{ 
          backgroundColor: projectedNum > baseline ? "rgba(239, 68, 68, 0.03)" : "rgba(34, 197, 94, 0.03)"
        }}
        className="absolute inset-0 z-0 transition-colors duration-500"
      />
      
      <div className="mb-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-blue-400 w-5 h-5" />
          <h3 className="font-semibold text-lg text-white">Indian Impact Simulator</h3>
        </div>
      </div>

      <div className="flex flex-col gap-6 z-10 flex-1">
        
        {/* Sliders Area */}
        <div className="space-y-4">
          {/* Car Driving Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <label htmlFor="car-slider" className="flex items-center gap-2 text-slate-300">
                <Car className="w-3.5 h-3.5" /> Car driving (km/day)
              </label>
              <span id="car-value" className="font-mono flex items-center gap-1.5">
                {isFitSynced && <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10 animate-pulse">Synced</span>}
                {car}
              </span>
            </div>
            <input 
              id="car-slider"
              type="range" min="0" max="80" value={car} 
              disabled={isFitSynced}
              onChange={(e) => setCar(parseInt(e.target.value))}
              aria-describedby="car-value"
              aria-valuemin={0}
              aria-valuemax={80}
              aria-valuenow={car}
              className="w-full accent-blue-500 appearance-none h-1.5 bg-slate-700/60 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 disabled:opacity-50" 
            />
          </div>

          {/* Two-Wheeler Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <label htmlFor="tw-slider" className="flex items-center gap-2 text-slate-300">
                <Activity className="w-3.5 h-3.5 text-blue-400" /> Two-Wheeler (km/day)
              </label>
              <span id="tw-value" className="font-mono flex items-center gap-1.5">
                {isFitSynced && <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10">Synced</span>}
                {twoWheeler}
              </span>
            </div>
            <input 
              id="tw-slider"
              type="range" min="0" max="60" value={twoWheeler} 
              disabled={isFitSynced}
              onChange={(e) => setTwoWheeler(parseInt(e.target.value))}
              aria-describedby="tw-value"
              aria-valuemin={0}
              aria-valuemax={60}
              aria-valuenow={twoWheeler}
              className="w-full accent-blue-400 appearance-none h-1.5 bg-slate-700/60 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 disabled:opacity-50" 
            />
          </div>

          {/* Auto-Rickshaw Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <label htmlFor="auto-slider" className="flex items-center gap-2 text-slate-300">
                <RefreshCw className="w-3.5 h-3.5 text-purple-400" /> Auto-rickshaw (km/day)
              </label>
              <span id="auto-value" className="font-mono flex items-center gap-1.5">
                {isFitSynced && <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10">Synced</span>}
                {autoRickshaw}
              </span>
            </div>
            <input 
              id="auto-slider"
              type="range" min="0" max="40" value={autoRickshaw} 
              disabled={isFitSynced}
              onChange={(e) => setAutoRickshaw(parseInt(e.target.value))}
              aria-describedby="auto-value"
              aria-valuemin={0}
              aria-valuemax={40}
              aria-valuenow={autoRickshaw}
              className="w-full accent-purple-400 appearance-none h-1.5 bg-slate-700/60 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 disabled:opacity-50" 
            />
          </div>
          
          {/* Home Energy Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <label htmlFor="energy-slider" className="flex items-center gap-2 text-slate-300">
                <Home className="w-3.5 h-3.5 text-yellow-400" /> Home Energy (kWh/day)
              </label>
              <span id="energy-value" className="font-mono flex items-center gap-1.5">
                {isMeterSynced && <span className="text-[10px] text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10 animate-pulse">BESCOM Live</span>}
                {energy}
              </span>
            </div>
            <input 
              id="energy-slider"
              type="range" min="2" max="40" value={energy} 
              disabled={isMeterSynced}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              aria-describedby="energy-value"
              aria-valuemin={2}
              aria-valuemax={40}
              aria-valuenow={energy}
              className="w-full accent-yellow-500 appearance-none h-1.5 bg-slate-700/60 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-500 disabled:opacity-50" 
            />
          </div>

          {/* Diet Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <label htmlFor="diet-slider" className="flex items-center gap-2 text-slate-300">
                <Activity className="w-3.5 h-3.5 text-orange-500" /> High Carbon Meals/week
              </label>
              <span id="diet-value" className="font-mono">{diet}</span>
            </div>
            <input 
              id="diet-slider"
              type="range" min="0" max="21" value={diet} 
              onChange={(e) => setDiet(parseInt(e.target.value))}
              aria-describedby="diet-value"
              aria-valuemin={0}
              aria-valuemax={21}
              aria-valuenow={diet}
              className="w-full accent-orange-500 appearance-none h-1.5 bg-slate-700/60 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500" 
            />
          </div>
        </div>

        {/* Telemetry Integration Hub */}
        <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/40 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Telemetry Integration Hub</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsMeterSynced(prev => {
                  const next = !prev;
                  if (next) setEnergy(6); // Synced energy value
                  return next;
                });
              }}
              className={cn(
                "p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col gap-1",
                isMeterSynced 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                  : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
              )}
            >
              <span className="font-semibold">Smart Utility Meter</span>
              <span className="text-[10px] text-slate-500">{isMeterSynced ? "BESCOM Synced" : "BESCOM / Tata Power"}</span>
            </button>
            <button
              onClick={() => {
                setIsFitSynced(prev => {
                  const next = !prev;
                  if (next) {
                    setCar(3);
                    setTwoWheeler(2);
                    setAutoRickshaw(1);
                  }
                  return next;
                });
              }}
              className={cn(
                "p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col gap-1",
                isFitSynced 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                  : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
              )}
            >
              <span className="font-semibold">Wearable Sync</span>
              <span className="text-[10px] text-slate-500">{isFitSynced ? "Google Fit Synced" : "Google Fit / Strava"}</span>
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="w-full flex justify-between items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Projected Footprint</div>
            <div className="flex items-baseline gap-1 mt-1">
              <motion.span 
                key={projectedFootprint}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-3xl font-display font-bold ${isBetter ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {projectedFootprint}
              </motion.span>
              <span className="text-slate-400 font-medium text-sm">Tons CO₂/yr</span>
            </div>
          </div>
          
          <div className="text-right border-l border-slate-700/50 pl-4">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Vs Indian Avg (2.8T)</span>
            <div className="mt-1">
              {isBetter ? (
                <span className="text-emerald-400 text-sm font-semibold flex items-center justify-end gap-1">
                  ↓ {(diff * 1000).toFixed(0)} kg saved
                </span>
              ) : (
                <span className="text-red-400 text-sm font-semibold flex items-center justify-end gap-1">
                  ↑ {(Math.abs(diff) * 1000).toFixed(0)} kg added
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
