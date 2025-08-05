import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)
  const PassGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}|:<>?/`~"

    for (let i = 1; i <= length; i++) {
      let char = (Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 15)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() =>{
    PassGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])

  return (
      <div className='w-xl max-w-2xl mx-auto bg-gray-800 rounded-xl px-6 py-8 my-10 text-white shadow-2xl'>
        <h1 className='text-4xl font-bold text-center mb-10 text-gray-200'>Password generator</h1>

        <div className='flex rounded-lg overflow-hidden mb-6 bg-white'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-3 px-4 text-gray-600 placeholder-gray-400 bg-white'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPassword}
          className='outline-none rounded-lg bg-green-400 hover:bg-green-500 text-white px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg '>
            Copy
          </button>
        </div>

        <div className='flex flex-col items-center'>
          <div className='flex items-center w-full justify-between'>
            <input
              type="range"
              min={7}
              max={100}
              value={length}
              className='h-2 w-37 bg-white rounded-lg appearance-none cursor-pointer slider'
              onChange={(e)=>{setlength(e.target.value)}}
            />
            <label className='text-orange-400 font-medium text-lg ml-4'>Length: {length}</label>
            <div className='flex items-center gap-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setnumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className='text-lg'>Numbers</label>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='characterInput'
                onChange={() => {
                  setcharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className='text-lg'>Characters</label>
            </div>

          </div>
        </div>
      </div>
  )
}

export default App
