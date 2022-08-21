import React,{useState , useEffect} from 'react'
import './Navbar.css'
function Navbar() {

  const [observe , setObserve] =  useState(false);

  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY>100){
        setObserve(true)
      }else{
        setObserve(false)
      }
    })
  },[])



  return (
    <div className={ observe ? "navImgBlack" : "navImg"}>
      <img className='img1' src="https://upload.wikimedia.org/wikipedia/commons/1/15/Logonfx.png" alt="Netflix" />
      <img className='img2' src="/back.jpg" alt="Pakistan" />

    </div>
  )
}

export default Navbar
