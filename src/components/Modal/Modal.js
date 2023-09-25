import {  useEffect } from "react";
import { createPortal } from "react-dom";
import './Modal.css'

const modalRoot=document.querySelector('#modal-root');

export default function Modal ({children,onClose}){
    useEffect(()=>{
        window.addEventListener('keydown',handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    },[])

   const  handleKeyDown =e=>{
        if(e.code==='Escape'){
            onClose();
        }
    }

const handleBackDropClick=e=>{
    if(e.currentTarget===e.target){
        onClose()
    }
}
   
        return createPortal(
            <div   className='Modal__backdrop' onClick={handleBackDropClick}>
                <div className="Modal__content">{children}</div>
            </div>,
            modalRoot
        )
    }


// import {  Component, useEffect } from "react";
// import { createPortal } from "react-dom";
// import './Modal.css'
// const modalRoot=document.querySelector('#modal-root');

// export default class Modal extends Component{
//     componentDidMount(){
//         window.addEventListener('keydown',this.handleKeyDown)
//     }

//     componenetWillUnmount(){
//         window.removeEventListener('keydown',this.handleKeyDown)
//     }

//     handleKeyDown =e=>{
//         if(e.code==='Escape'){
//             this.props.onClose();
//         }
//     }

// handleBackDropClick=e=>{
//     if(e.currentTarget===e.target){
//         this.props.onClose()
//     }
// }

//     render(){
//         return createPortal(
//             <div   className='Modal__backdrop' onClick={this.handleBackDropClick}>
//                 <div className="Modal__content">{this.props.children}</div>
//             </div>,
//             modalRoot
//         )
//     }
// }