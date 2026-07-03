type DonationButtonProps = {
  className?: string;
};

export function DonationButton({ className = "" }: DonationButtonProps) {
  const donationUrl = process.env.NEXT_PUBLIC_RAZORPAY_DONATION_URL || "#";

  return (
    <a
      href={donationUrl}
      target={donationUrl.startsWith("http") ? "_blank" : undefined}
      rel={donationUrl.startsWith("http") ? "noreferrer" : undefined}
      className={`inline-flex min-h-10 items-center justify-center rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-white ${className}`}
    >
      Support / Donate
    </a>
  );
}
