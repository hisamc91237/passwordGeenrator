import { useCallback, useEffect, useState,useRef } from 'react'

function App() {

  // Creeating Hooks to reflect changes on UI
  const[length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState("")

   //Creating useRef Hook to have a link b/w input field and func
   const passwordRef = useRef(null)

  // Creaing useCallback Hooks to optimize the code
  const generatePassword = useCallback(() => {
    let pass = ""

    // creating the password string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    //iterating to create password
    for (let i = 1; i < length; i++){
     let temp =  Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(temp)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  // function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  //Creating useEffect Hook to call the useCallBAck function
  useEffect(() => {
    generatePassword()
  }, [length,numberAllowed,charAllowed,generatePassword] )

 

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center my-3'>Password generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder='password'
      readOnly
      ref={passwordRef}
       />
       <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
      <input type="range"
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setLength(e.target.value)}} // onChange event
       />
        <label>Length: {length}</label>
     </div>
     <div className="flex items-center gap-x-1"> 
      <input type="checkbox"
      defaultChecked={numberAllowed}
      id="numberInput"
      onChange={() => {
        setNumberAllowed((prev) => !prev);
      }} />
      <label htmlFor="numberInput">Numbers</label>
     </div>
     <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>

     </div>
     </div>
    </>
  )
}

export default App