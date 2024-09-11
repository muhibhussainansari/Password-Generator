import { useCallback, useEffect, useRef, useState } from "react";
// import './App.css'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numsAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "+-'/@#{}*$%^!&_";
    }
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numsAllowed, charAllowed]);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numsAllowed, charAllowed]);
  return (
    <>
      <div className="flex justify-center text-center">
        <div className=" w-[600px] h-[200px] bg-gray-700 my-28 rounded-xl">
          <div className="py-3">
            <h1 className="text-white font-semibold text-xl">
              Password Generator
            </h1>
          </div>
          <div className="flex justify-center py-6 flex-wrap">
            <div className="bg-white rounded-lg w-[500px] h-[40px] flex flex-wrap">
              <input
                type="text"
                value={password}
                readOnly
                ref={passwordRef}
                className="w-[420px] h-[40px] rounded-lg pl-2 outline-none text-orange-500 font-medium text-md"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white font-medium w-20 h-[40px] outline-none rounded-md hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-white py-2">
            <div className="w-[230px] flex">
              <input
                className="cursor-pointer"
                type="range"
                min={8}
                max={40}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="px-2 font-medium">Length : {length}</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                defaultChecked={numsAllowed}
                onChange={() => setNumsAllowed((prev) => !prev)}
              />
              <label className="px-2  font-medium">Numbers</label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="px-2  font-medium">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
