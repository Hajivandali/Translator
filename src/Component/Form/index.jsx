import { useEffect, useState } from "react";
import '../../Styles/TailwindStyles.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState("");
  

  const handleTranslate = async () => {
    const response = await fetch('https://yandex.cloud/api/translate/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"sourceLanguageCode": "fa",
        "targetLanguageCode": "en",
        "texts": [inputText]
      }),
    });
    const data = await response.json();
    setTranslatedText(data.translations);
  };

  useEffect(()=>{
   var time = setTimeout(() =>{handleTranslate()},500)
    return()=>{
        clearTimeout(time)
    }
  },[inputText])

  return (
    <div>
      <button>تغیر زبان </button>t
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text here..."
      />
      {/* <button onClick={handleTranslate}>Translate</button> */}

      <p>Translated Text: {translatedText&&
      translatedText[0]?.text}</p>
    </div>
  );
};

export default Translator;
