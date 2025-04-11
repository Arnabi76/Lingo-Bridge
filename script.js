async function translateText() {
    const inputText = document.getElementById("inputText").value.trim();
    const fromLang = document.getElementById("fromLang").value;
    const toLang = document.getElementById("toLang").value;
    const resultDiv = document.getElementById("result");
  
    if (!inputText) {
      resultDiv.innerText = "⚠️ Please enter some text.";
      return;
    }
  
    resultDiv.innerText = "⏳ Translating...";
  
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLang}|${toLang}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.responseData.translatedText) {
        resultDiv.innerText = data.responseData.translatedText;
      } else {
        resultDiv.innerText = "❌ Failed to translate. Try again.";
      }
    } catch (error) {
      console.error("Translation Error:", error);
      resultDiv.innerText = "❌ Network or API error. Please try again.";
    }
  }
  
  function startVoice() {
    const inputField = document.getElementById("inputText");
    const micButton = document.getElementById("micBtn");
  
    // Check if browser supports it
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
  
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    micButton.innerText = "🎙️ Listening...";
    recognition.start();
  
    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
      micButton.innerText = "🎤 Start Speaking";
    };
  
    recognition.onerror = function (event) {
      console.error("Speech error:", event.error);
      micButton.innerText = "🎤 Start Speaking";
      alert("Speech recognition error: " + event.error);
    };
  
    recognition.onend = function () {
      micButton.innerText = "🎤 Start Speaking";
    };
  }
  