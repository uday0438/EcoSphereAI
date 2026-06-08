import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { type MonthlyData } from "../types";

const mockData: MonthlyData[] = [
  { month: "Jan", emissions: 240, projected: 240 },
  { month: "Feb", emissions: 220, projected: 220 },
  { month: "Mar", emissions: 205, projected: 205 },
  { month: "Apr", emissions: 190, projected: 190 },
  { month: "May", emissions: 175, projected: 175 },
  { month: "Jun", emissions: 150, projected: 150 },
  { month: "Jul", emissions: 140, projected: 140 },
];

export function EmissionsChart() {
  return (
    <section aria-labelledby="chart-title" className="glass-card rounded-3xl p-6 h-full flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 id="chart-title" className="font-semibold text-lg text-white">Carbon Footprint Trend</h3>
          <p className="text-xs text-emerald-400 font-medium">↓ 12% improvement vs last month</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]" role="img" aria-label="Area chart displaying carbon emissions by month from January to July, showing a downward trend from 240kg in January to 140kg in July.">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#22c55e' }}
            />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#22c55e" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorEmissions)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
