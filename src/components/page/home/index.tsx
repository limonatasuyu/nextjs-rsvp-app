import Image from "next/image";
import Link from "next/link";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-16 bg-white">
      <div className="text-center md:text-left max-w-xl">
        <h2 className="font-bold text-4xl md:text-5xl text-primary leading-snug">
          Create and Manage <br /> Your RSVPs with Ease
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Set up a custom RSVP page for any event. Simple. Elegant. Fast.
        </p>
        <Link
          href="/create"
          style={{ appearance: "button" }}
          className="mt-6 bg-primary hover:bg-primary/80 text-white text-lg font-semibold px-6 py-3 rounded-2xl transition"
        >
          Create RSVP Page
        </Link>
      </div>

      <Image src="/invite.jpg" alt="Invitation" width={500} height={500} className="rounded-xl shadow-lg" />
    </div>
  );
}
