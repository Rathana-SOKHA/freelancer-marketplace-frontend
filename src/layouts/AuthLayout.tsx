// frontend/src/layouts/AuthLayout.tsx
import React from "react";
import { Link, Outlet } from "react-router";


export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f8fb] p-4 text-black sm:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden border-2 border-black bg-white shadow-[8px_8px_0_#111] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative flex min-h-56 flex-col justify-between overflow-hidden border-b-2 border-black bg-[#ffe96a] p-6 sm:p-10 lg:border-b-0 lg:border-r-2">
          <div className="relative z-10">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xl font-black tracking-tight text-black"
            >
              <span className="flex size-9 items-center justify-center border-2 border-black bg-black text-lg text-[#ffe96a]">
                ◈
              </span>
              FreelanceHub
            </Link>
          </div>

          <div className="relative z-10 mt-12 max-w-md">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
              Your next chapter starts here
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl">
              Work better.
              <br />
              Build together.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-6 text-black/75">
              A place for great clients and talented freelancers to find each
              other and make meaningful work happen.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex items-center justify-between border-t-2 border-black pt-4 font-mono text-[10px] font-bold uppercase tracking-wider">
            <span>Independent work, connected</span>
            <span>FH / 01</span>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -right-10 size-56 rotate-12 border-[24px] border-black/5"
          />
          <div
            aria-hidden="true"
            className="absolute right-8 top-24 size-20 border-2 border-black/10"
          />
        </aside>

        <main className="flex items-center justify-center p-5 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-7 border-b-2 border-dashed border-black pb-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                FreelanceHub / Account
              </p>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
