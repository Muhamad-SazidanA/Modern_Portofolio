import { TubesCursor } from "@/components/ui/tube-cursor";

export default function DemoOne() {
  return (
    <TubesCursor
      title="Tubes"
      subtitle="Cursor"
      caption="Click to Change - by Rahil Vahora"
      initialColors={["#7dc6ff", "#b3f2c8", "#ffd59a"]}
      lightColors={["#fff1b8", "#b8f1ff", "#ffd1e6", "#c3f0ca"]}
      lightIntensity={140}
      titleSize="text-[70px]"
      subtitleSize="text-[50px]"
      captionSize="text-lg"
      enableRandomizeOnClick
    />
  );
}
