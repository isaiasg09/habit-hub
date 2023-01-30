import "./styles/global.css";
import "./lib/dayjs";

import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <div className='bg-darkbg w-screen h-screen flex justify-center items-center text-white'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Toaster
          toastOptions={{
            className: "bg-zinc-700",
            style: {
              background: "rgb(63 63 70)",
              color: "white",
            },
          }}
        />

        <Header />

        <SummaryTable />
      </div>
    </div>
  );
}
