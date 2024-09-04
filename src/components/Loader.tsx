export default function Loader() {
  return (
    <div className="w-full h-[313px] p-4 rounded-3xl bg-tertiary flex flex-col justify-center items-center">
      <div className="border-secondary h-20 w-20 animate-spin rounded-full border-8 border-t-primary" />
      <div className="mt-2 text-center">Loading...</div>
    </div>
  );
}
