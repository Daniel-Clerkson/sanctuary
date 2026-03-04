import { useState, useEffect } from "react";

function ScriptureCarousel() {
  const [scripture, setScripture] = useState("Loading...");
  const [ref, setRef] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const getVerse = async () => {
      try {
        const response = await fetch("https://bible-api.com/data/web/random");
        const data = await response.json();
        
        const verse = data.random_verse.text;
        const reference = `${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`;

        setScripture(verse);
        setRef(reference);
        setFade(true);
      } catch (error) {
        console.error("Failed to fetch verse:", error);
        setScripture("Could not load scripture.");
      }
    };

    getVerse();
  }, []);

  return (
    <div
      className={`max-w-md text-center transition-opacity duration-1000 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <blockquote className="font-serif italic text-cream/90 text-xl md:text-2xl leading-relaxed">
        {`"${scripture}"`}
      </blockquote>
      <div className="font-mono text-gold/60 text-xs mt-4 tracking-wider uppercase">
        {ref}
      </div>
    </div>
  );
}

export default ScriptureCarousel;