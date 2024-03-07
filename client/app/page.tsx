'use client'
import { useState, useEffect } from "react";
import classNames from "classnames"
import './globals.css'
import {Textarea} from "@nextui-org/input";

export default function Home() {
  const [text, setText] = useState('')
  const [videoType, setVideoType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [textBox, setTextBox] = useState(false)
  const [subway, setSubway] = useState(false)
  const [gta, setGta] = useState(false)
  const [minecraft, setMinecraft] = useState(false)
  const [downloadURL, setDownloadURL] = useState('')

 
  const handleSubmit = async (e : any) =>{
    e.preventDefault()
    setIsLoading(true)
    const submitData = {'text' : text, 'videoType' : videoType}
    console.log(submitData)


    const res = await fetch('http://165.232.120.81:5000/api/getdata',
      {
        method : 'POST',
        body: JSON.stringify(submitData),
        headers : {'content-type' :  'application/json'}
      }
    )
    
    const blob = await res.blob()
    const newBlob = new Blob([blob], {type : 'video/mp4'})
    const blobUrl = window.URL.createObjectURL(newBlob)

    setDownloadURL(blobUrl)

    
    setIsLoading(false)
    setText('')
    setVideoType('')
  }

  

  return (
    <div className="flex justify-center w-screen font-mono uppercase">
      <div className="flex flex-col w-2/3 shadow-lg mt-12">
        <div className="flex items-center justify-center w-full mt-12 font-bold text-2xl text-indigo-900">GENERATE YOUR ENGLISH TEXT-TO-SPEECH VIDEO</div>
        
        <div className="flex items-center justify-center w-full mt-3 mb-6 font-bold text-xl">choose template video</div>

        <div className="flex justify-evenly w-full mb-8">

          <div className="flex flex-col w-1/5 aspect-[3/4]">
            <button
              onClick={() => {setMinecraft(!minecraft); setGta(false); setSubway(false); setTextBox(true); setVideoType('minecraft')}}
              className={classNames("w-full h-full hover:-translate-y-3 duration-300 shadow-lg bg-[url('/minecraft.png')] rounded-sm", {
                "-translate-y-3" : minecraft
              })}
            />
            <div className={classNames("w-full h-1 -mt-1 rounded-sm", {"bg-indigo-900" : minecraft})}/>
          </div>

          <div className="flex flex-col w-1/5 aspect-[3/4]">
            <button
              onClick={() => {setMinecraft(false); setGta(!gta); setSubway(false); setTextBox(true); setVideoType('gta')}}
              className={classNames("w-full h-full hover:-translate-y-3 duration-300 shadow-lg bg-[url('/gtav.png')] rounded-sm", {
                "-translate-y-3" : gta
              })}
            />
            <div className={classNames("w-full h-1 -mt-1 rounded-sm", {"bg-indigo-900" : gta})}/>
          </div>

          <div className="flex flex-col w-1/5 aspect-[3/4]">
            <button
              onClick={() => {setMinecraft(false); setGta(false); setSubway(!subway); setTextBox(true); setVideoType('subway')}}
              className={classNames("w-full h-full hover:-translate-y-3 duration-300 shadow-lg bg-[url('/subway.png')] rounded-sm", {
                "-translate-y-3" : subway
              })}
            />
            <div className={classNames("w-full h-1 -mt-1 rounded-sm", {"bg-indigo-900" : subway})}/>
          </div>

        </div>

        {!(!textBox || !(gta || minecraft || subway)) ? 

        <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-12 pt-0 items-center">
                <Textarea
                  isRequired
                  variant="underlined"
                  placeholder="Enter your english text"
                  className="max-w-2xl"
                  value={text}
                  onValueChange={setText}
                />

              
                {
                isLoading ? <div>Generating video...</div> :
                <>
                  
                  {!downloadURL ? 
                  <button 
                    type="submit"
                    className="border w-1/6 mt-4 text-2xl rounded-sm bg-indigo-600 text-white hover:bg-indigo-900 duration-300"
                  >
                    SUBMIT
                  </button>

                  : <a href={downloadURL} download="generatedVideo.mp4" className="border w-1/6 mt-4 text-2xl rounded-md bg-indigo-600 text-white hover:bg-indigo-900 duration-300 text-center">download</a>}
                  </>
                }
            </div>
        </form>
        : <div></div>
        }

        
        
        
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------------------------------------------CLASSNAMES-------------------------------------------------------------------------------------------------------------
//                  <div className="flex flex-row">
//                     <h1 className="text-xs font-bold uppercase mr-1 mt-3 text-gray-500">manage</h1>
//                     <button 
//                     onClick={() => {setManageView(!manageView)}}
//                     className={classNames("flex w-10 h-5 m-3 bg-gray-400 rounded-full transition-all duration-800", {
//                         'bg-green-600' : manageView
//                     })}
//                     >
//                         <span className={classNames('w-5 h-5 bg-white shadow rounded-full transition-all duration-800', {
//                             'ml-5' : manageView
//                         })}></span>
//                     </button>
//                 </div>
//
// bg-[url('/gtav.png')]
//-------------------------------------------------------------------------------------------------------------CLASSNAMES-------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------------------------WORKING CODE-------------------------------------------------------------------------------------------------------------

// const reader = response.body?.getReader();
//       return new ReadableStream({
//         start(controller) {
//           return pump();
//           function pump() : any {
//             return reader?.read().then(({ done, value }) => {
//               // When no more data needs to be consumed, close the stream
//               if (done) {
//                 controller.close();
//                 return;
//               }
//               // Enqueue the next data chunk into our target stream
//               controller.enqueue(value);
//               return pump();
//             });
//           }
//         },
//       });
//     })
//     // Create a new response out of the stream
//     .then((stream) => new Response(stream))
//     // Create an object URL for the response
//     .then((response) => response.blob())
//     .then((blob) => {
//       URL.createObjectURL(blob)
//       console.log(blob)
//     })
    
//     .then((url) => console.log((url)))
//     .catch((err) => console.error(err));

//-------------------------------------------------------------------------------------------------------------WORKING CODE-------------------------------------------------------------------------------------------------------------
