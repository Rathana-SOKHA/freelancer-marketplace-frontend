
import { ArrowLeft, ScanSearch } from "lucide-react";
import { Link } from "react-router";

function PageNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] p-5 text-black sm:p-8">
      <section className="relative w-full max-w-3xl overflow-hidden border-2 border-black bg-white p-6 shadow-[8px_8px_0_#111] sm:p-10">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 size-48 rotate-12 border-[22px] border-[#ffe96a]/60"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 border-2 border-black bg-[#ffe96a] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider">
            <ScanSearch size={16} aria-hidden="true" />
            Route not found
          </div>

          <p className="mt-8 font-mono text-7xl font-black leading-none tracking-tighter sm:text-9xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-black uppercase tracking-tight sm:text-4xl">
            This page isn’t on the map.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
            The link may be outdated, or the page may have moved. Head back to
            sign in and find your way from there.
          </p>

          <div className="mt-8 border-t-2 border-dashed border-black pt-5">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 border-2 border-black bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[3px_3px_0_#ffe96a] transition hover:bg-[#ffe96a] hover:text-black"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PageNotFound;