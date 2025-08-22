import { useEffect, useState } from "react";
import "./App.css";
import {
  populateFrequency,
  predict,
  type gram,
} from "./utils/markov_generator";

function App() {
  const [text, setText] = useState<string>("");
  const [freq, setFreq] = useState<gram | null>(null);
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");

  useEffect(() => {
    const output = populateFrequency(text, 3);
    setFreq(output);
    setCurrent(text.substring(0,3))
  }, [text]);

  const predictNext = () => {
    const res = predict(text,index,freq,3);
    setCurrent(next);
    setNext(res ?? "");
    setIndex(prev => prev + 1);
  }

  return (
    <div className="w-full bg-gray-100 h-screen py-8 px-4">
      <div className="text-4xl text-center text-orange-300 font-semibold">
        Markov Chain Text Generator
      </div>

      <hr className="my-8 text-gray-300" />

      <div className="flex p-2 flex-col gap-4">
        <div className="w-full">
          <p className="font-semibold text-xl">Enter Text</p>
          <textarea
            className="resize-none bg-gray-700 rounded-md text-white focus:outline-none p-8 h-50 w-full select-none shadow-lg overflow-y-auto"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="w-full">
          <p className="font-semibold text-xl mt-2">Frequency Output</p>
          <Display ngrams={freq} />
        </div>

        <div className="mx-auto bg-gray-600 h-50 text-white font-semibold px-6 py-4 w-max flex-col flex gap-5 shadow-md rounded-md">
          <div className="flex gap-4">
            <button onClick={predictNext} className="cursor-pointer bg-slate-800 px-2 py-1 rounded-md hover:bg-slate-900 duration-200">
              Predict
            </button>
            <button className="hover:bg-slate-900 duration-200 cursor-pointer bg-slate-800 px-2 py-1 rounded-md">
              Reset
            </button>
          </div>

          <table className="w-full border-collapse rounded-md overflow-hidden shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Index</th>
                <th className="px-4 py-2 text-left">Current</th>
                <th className="px-4 py-2 text-left">Prediction</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              <tr className="border-b">
                <td className="px-4 py-2">{index}</td>
                <td className="px-4 py-2">{current}</td>
                <td className="px-4 py-2">{next}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const Display = ({ ngrams }: { ngrams: gram | null }) => {
  if (!ngrams) return null;

  return (
    <div className="bg-gray-400 text-slate-800 p-4 shadow-md rounded-md text-xl grid grid-cols-3 h-max">
      {Object.entries(ngrams).map(([key, values]) => (
        <div key={key}>
          {key === " " ? "<space>" : key}: [{values.join(", ")}]
        </div>
      ))}
    </div>
  );
};

export default App;
