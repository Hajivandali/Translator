import { useEffect, useState } from "react";

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("fa");
  const [targetLanguage, setTargetLanguage] = useState("en");

  const handleTranslate = async () => {
    
      const response = await fetch('https://yandex.cloud/api/translate/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceLanguageCode: sourceLanguage,
          targetLanguageCode: targetLanguage,
          texts: [inputText]
        }),
      });


      const data = await response.json();
      setTranslatedText(data.translations[0]?.text);
  };

  useEffect(() => {
    if (inputText) {
      const time = setTimeout(() => handleTranslate(), 500);
      return () => clearTimeout(time);
    }
  }, [inputText, sourceLanguage, targetLanguage]);

  const switchLanguages = () => {
    setSourceLanguage(prev => prev === "fa" ? "en" : "fa");
    setTargetLanguage(prev => prev === "en" ? "fa" : "en");
  };
  
  return (

    <div className="flex flex-col border-2 items-center p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto mt-10" >
      <button 
        className="px-6  py-2 mb-4 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition duration-300 ease-in-out"
        onClick={switchLanguages}
      >
        Switch Languages to {targetLanguage}
      </button>

      <textarea className={`w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 text-base `}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={sourceLanguage === 'fa' ? ' بنویسید' : 'Enter text here...'}
        style={{ direction: sourceLanguage === 'fa' ? 'rtl' : 'ltr' }}
      />
      <p className="mt-2 text-lg">
        Translated Text:
      </p>
      <p className="mt-4 text-lg">
      {translatedText }
      </p>
    </div>
  );
};

export default Translator;
