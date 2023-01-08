



const Circle = ({ colour, pct }:{ colour:string, pct:number }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    />
  );
};

const StringPercent = ({amount}:{amount:number}) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.2em"}
    >
      {amount.toFixed(0)}%
    </text>
  );
};

const CircularBar = ({ percent, colour }:{ percent:number, colour:string }) => {
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour={colour} pct={percent} />
      </g>
      <StringPercent amount={percent} />
    </svg>
  );
};

export default CircularBar;
