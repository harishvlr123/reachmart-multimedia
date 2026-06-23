import { memo, useEffect, useRef } from "react";
import type { VisualizerType } from "@/components/player/types";

export const Visualizer = memo(function Visualizer({
  analyser,
  active,
  type,
  sensitivity,
  colorSpeed,
  size,
  overlay = false,
  onFullscreen,
}: {
  analyser: AnalyserNode | null;
  active: boolean;
  type: VisualizerType;
  sensitivity: number;
  colorSpeed: number;
  size: number;
  overlay?: boolean;
  onFullscreen: (element: HTMLElement | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let animation = 0;
    const frequency = new Uint8Array(analyser?.frequencyBinCount ?? 256);
    const waveform = new Uint8Array(analyser?.fftSize ?? 512);

    function draw() {
      if (!canvas || !context) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      context.fillStyle = overlay ? "rgba(0,0,0,.16)" : "rgba(2,3,12,.28)";
      context.fillRect(0, 0, width, height);
      if (analyser) {
        analyser.getByteFrequencyData(frequency);
        analyser.getByteTimeDomainData(waveform);
      } else {
        frequency.forEach((_, index) => { frequency[index] = 28 + Math.max(0, Math.sin(Date.now() / 260 + index * 0.31)) * 35; });
        waveform.forEach((_, index) => { waveform[index] = 128 + Math.sin(Date.now() / 300 + index / 9) * 14; });
      }
      const time = Date.now() / (1300 / colorSpeed);
      const energy = frequency.reduce((sum, value) => sum + value, 0) / frequency.length / 255;
      if (type === "Rainbow Bars") drawRainbowBars(context, frequency, width, height, sensitivity, size, time);
      else if (type === "Circle Spectrum") drawCircle(context, frequency, width, height, sensitivity, size, time);
      else if (type === "Fire Wave") drawFireWave(context, waveform, width, height, sensitivity, size, time);
      else if (type === "Cyber Tunnel") drawTunnel(context, frequency, width, height, sensitivity, size, time);
      else if (type === "Star Pulse") drawStars(context, width, height, energy, sensitivity, size, time);
      else if (type === "Classic Winamp") drawClassic(context, frequency, width, height, sensitivity, size);
      else if (type === "DJ Studio Mix") drawDjMix(context, frequency, waveform, width, height, sensitivity, size, time);
      else drawGalaxy(context, frequency, width, height, sensitivity, size, time);
      animation = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animation);
  }, [active, analyser, colorSpeed, overlay, sensitivity, size, type]);

  return (
    <div className={`relative h-full min-h-[250px] overflow-hidden rounded-2xl ${overlay ? "bg-black/20" : "bg-[#02030b]"}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {!active && <div className="absolute inset-0 grid place-items-center bg-black/45 text-xs font-bold uppercase tracking-[0.24em] text-white/25">Visualizer off</div>}
      <button type="button" onClick={() => onFullscreen(canvasRef.current?.parentElement ?? null)} className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-[10px] text-white/55 backdrop-blur hover:text-white">
        Fullscreen
      </button>
    </div>
  );
});

function hue(time: number, offset = 0) {
  return `hsl(${(time * 70 + offset) % 360} 96% 62%)`;
}

function drawRainbowBars(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  const bars = Math.round(42 * size);
  const gap = 3;
  const barWidth = Math.max(2, (width - gap * bars) / bars);
  for (let index = 0; index < bars; index += 1) {
    const value = data[Math.floor(index / bars * data.length)] / 255;
    const barHeight = Math.max(4, value * height * intensity);
    const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
    gradient.addColorStop(0, hue(time, index * 8));
    gradient.addColorStop(0.55, hue(time, index * 8 + 80));
    gradient.addColorStop(1, "#fff");
    ctx.fillStyle = gradient;
    ctx.shadowColor = hue(time, index * 8);
    ctx.shadowBlur = 10;
    ctx.fillRect(index * (barWidth + gap), height - barHeight, barWidth, barHeight);
  }
  ctx.shadowBlur = 0;
}

function drawGalaxy(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  const cx = width / 2;
  const cy = height / 2;
  ctx.globalCompositeOperation = "lighter";
  for (let index = 0; index < 110; index += 1) {
    const value = data[index % data.length] / 255 * intensity;
    const arm = index % 4;
    const radius = (index / 110) * Math.min(width, height) * 0.62 * size;
    const angle = time * 0.22 + arm * Math.PI / 2 + radius * 0.035;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * 0.48;
    ctx.fillStyle = hue(time, index * 5);
    ctx.globalAlpha = 0.2 + value * 0.8;
    ctx.beginPath();
    ctx.arc(x, y, 1 + value * 5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

function drawCircle(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  const cx = width / 2;
  const cy = height / 2;
  const base = Math.min(width, height) * 0.16 * size;
  for (let index = 0; index < 96; index += 1) {
    const angle = index / 96 * Math.PI * 2;
    const value = data[Math.floor(index / 96 * data.length)] / 255 * intensity;
    ctx.strokeStyle = hue(time, index * 4);
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * base, cy + Math.sin(angle) * base);
    ctx.lineTo(cx + Math.cos(angle) * (base + value * base * 1.9), cy + Math.sin(angle) * (base + value * base * 1.9));
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

function drawFireWave(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  const gradient = ctx.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, "#ff1700");
  gradient.addColorStop(0.45, "#ff8a00");
  gradient.addColorStop(0.8, "#ffe600");
  gradient.addColorStop(1, "#fff");
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3 * size;
  ctx.shadowColor = "#ff4d00";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = index / (data.length - 1) * width;
    const y = height / 2 + ((value - 128) / 128) * height * 0.45 * intensity * size + Math.sin(time + index / 16) * 6;
    if (!index) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawTunnel(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  const energy = data.reduce((sum, value) => sum + value, 0) / data.length / 255 * intensity;
  for (let ring = 0; ring < 14; ring += 1) {
    const phase = (time * 0.3 + ring / 14) % 1;
    const box = phase * Math.max(width, height) * size;
    ctx.globalAlpha = 1 - phase;
    ctx.strokeStyle = hue(time, ring * 24);
    ctx.lineWidth = 1 + energy * 3;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 12;
    ctx.strokeRect(width / 2 - box / 2, height / 2 - box / 3, box, box / 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number, energy: number, intensity: number, size: number, time: number) {
  for (let index = 0; index < 130; index += 1) {
    const angle = index * 2.399 + time * 0.04;
    const distance = ((index * 47 + time * 80) % 260) / 260 * Math.max(width, height) * 0.72;
    const x = width / 2 + Math.cos(angle) * distance;
    const y = height / 2 + Math.sin(angle) * distance;
    const star = (0.8 + energy * intensity * 4) * size;
    ctx.fillStyle = hue(time, index * 11);
    ctx.globalAlpha = 0.25 + (index % 8) / 11;
    ctx.fillRect(x, y, star, star);
  }
  ctx.globalAlpha = 1;
}

function drawClassic(ctx: CanvasRenderingContext2D, data: Uint8Array, width: number, height: number, intensity: number, size: number) {
  const bars = 36;
  const gap = 2;
  const barWidth = (width - bars * gap) / bars;
  for (let index = 0; index < bars; index += 1) {
    const value = data[Math.floor(index / bars * data.length)] / 255;
    const segments = Math.max(1, Math.floor(value * 18 * intensity * size));
    for (let segment = 0; segment < segments; segment += 1) {
      ctx.fillStyle = segment > 14 ? "#ff3b30" : segment > 10 ? "#ffd60a" : "#32d74b";
      ctx.fillRect(index * (barWidth + gap), height - segment * 10 - 8, barWidth, 7);
    }
  }
}

function drawDjMix(ctx: CanvasRenderingContext2D, data: Uint8Array, wave: Uint8Array, width: number, height: number, intensity: number, size: number, time: number) {
  drawRainbowBars(ctx, data, width, height, intensity * 0.72, size, time);
  ctx.globalCompositeOperation = "lighter";
  drawCircle(ctx, data, width, height, intensity * 0.8, size * 0.8, time);
  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = hue(time, 160);
  ctx.lineWidth = 2;
  ctx.beginPath();
  wave.forEach((value, index) => {
    const x = index / wave.length * width;
    const y = height / 2 + ((value - 128) / 128) * height * 0.25 * intensity;
    if (!index) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}
