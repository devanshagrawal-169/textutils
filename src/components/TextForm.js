import React, {useState} from 'react'

export default function TextForm(props) {
    
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to upper case", "success");
    }
    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lower case", "success");
    }
    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Cleared", "success");
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Speak Successfully", "success");
    }
    

    const handleOnChange = (event)=>{
        setText(event.target.value)
    }
    const handleSpaces=()=>{
        let newText =  text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Handle spaces successfully", "success");
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        document.getSelection().removeAllRanges();
        props.showAlert("Copied to Clipboard", "success");
    }

    const [text, setText] = useState('');
    // text = "new text" ; // wrong way to change the state
    // setText("new text"); //correct way
    
    return (
        <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
          <h1>{props.heading}</h1>
          <div className="mb-3">
              <textarea className="form-control" value ={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='dark'?'#13466e':'white',color:props.mode==='dark'?'white':'#042743'}} id="myBox " rows="8"></textarea>
          </div>
      <button disabled ={text.length===0}  className="btn btn-primary mx-1 my-1" onClick={handleUpClick}> Convert to UpperCase</button>
      <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}> Convert to LowerCase</button>
      <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}> Clear Text</button>
      <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}> Copy Complete Text</button>
      <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSpaces}> Remove Extra Spaces</button>
      <button disabled={text.length === 0} type="submit" onClick={speak} className="btn btn-primary mx-2 my-2">Speak</button>
    </div>
            <div className="conatiner my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your text Summary is:</h2>
        <p><b>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</b></p>
                <p>{0.08 * text.split(" ").filter((element) => { return element.length !== 0 }).length} Minutes to read </p>
        <h2>Preview of Text</h2>
        <p>{text.length>0?text:"Nothing to preview"}</p>
    </div>
        </>
  )
}
