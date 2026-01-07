export default function AdSlot({
  label = "Ad space",
}: {
  label?: string;
}) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}
