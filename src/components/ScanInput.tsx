"use client";

type Props = {
  onScan: (isbn: string) => Promise<void> | void;
  compact?: boolean;
};

export function ScanInput({ onScan, compact }: Props) {
  return (
    <form
      className="card"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const value = (new FormData(form).get("isbn") as string).trim();
        if (!value) return;
        await onScan(value);
        form.reset();
      }}
    >
      <label className="mb-2 block font-medium">Scan ISBN</label>
      <input name="isbn" autoFocus className="w-full rounded-lg border border-amber-300 p-2" placeholder={compact ? "Scan and press Enter" : "Barcode scanner input..."} />
      <p className="mt-2 text-xs text-stone-500">Scanner acts like keyboard: scan barcode then Enter.</p>
    </form>
  );
}
