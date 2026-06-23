import { useEffect, useRef } from "react";
import { PanelHeading } from "@/components/audio-player/playlist-panel";

export function VisualizerCanvas({
  analyser,
  isPlaying,
}: {
  analyser: AnalyserNode | null;
  isPlaying: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    const data = new Uint8Array(analyser?.frequencyBinCount ?? 64);

    const draw = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, height, 0, 0);
      const accent = getComputedStyle(canvas).getPropertyValue("--player-accent").trim() || "#22d3ee";
      gradient.addColorStop(0, "rgba(255,255,255,.08)");
      gradient.addColorStop(0.35, accent);
      gradient.addColorStop(1, "rgba(255,255,255,.9)");

      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(data);
      } else {
        data.forEach((_, index) => {
          data[index] = isPlaying ? 0 : 12 + Math.sin(Date.now() / 450 + index) * 6;
        });
      }

      const bars = Math.min(52, data.length);
      const gap = 3;
      const barWidth = Math.max(2, (width - gap * (bars - 1)) / bars);
      for (let index = 0; index < bars; index += 1) {
        const sampleIndex = Math.floor((index / bars) * data.length);
        const normalized = data[sampleIndex] / 255;
        const barHeight = Math.max(3, normalized * (height - 12));
        context.fillStyle = gradient;
        context.shadowColor = accent;
        context.shadowBlur = isPlaying ? 8 : 0;
        context.fillRect(index * (barWidth + gap), height - barHeight, barWidth, barHeight);
      }
      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, [analyser, isPlaying]);

  return (
    <section className="player-panel rounded-[1.6rem] p-4 sm:p-5">
      <PanelHeading title="Visualizer" meta={isPlaying ? "Signal active" : "Standby"} />
      <canvas ref={canvasRef} className="mt-4 h-48 w-full rounded-2xl border border-white/8 bg-black/25" />
    </section>
  );
}
