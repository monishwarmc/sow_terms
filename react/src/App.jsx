import { useState, useEffect } from 'react';
import { getTermById } from './utils/api';
import { Menu } from 'lucide-react';

const TERM_IDS = {
  en: { nav: 5, terms: 3 },
  sv: { nav: 6, terms: 4 },
};

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '/GB.png' },
  { code: 'sv', name: 'Swedish', flag: '/SE.png' },
];

export default function Home() {
  const [lang, setLang] = useState('en');
  const [navLabels, setNavLabels] = useState([]);
  const [termsText, setTermsText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    if (menuOpen) {
      setAnimating(true);
      setTimeout(() => {
        setMenuOpen(false);
        setAnimating(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const nav = await getTermById(TERM_IDS[lang].nav);
        const terms = await getTermById(TERM_IDS[lang].terms);
        setNavLabels(nav.content.split(','));
        setTermsText(terms.content);
      } catch (err) {
        console.error('Failed to load terms:', err);
      }
    };
    fetchTerms();
  }, [lang]);

  return (
    <div className="p-6 max-w-screen mx-auto items-center justify-center flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 w-[75%] relative">
        {/* Hamburger for mobile (replaces logo on small screens) */}
        <div className="lg:hidden">
          <button onClick={() => handleToggle()}>
            <Menu size={32} />
          </button>
        </div>

        {/* Logo (hidden on small screens) */}
        <div className="hidden lg:block">
          <img src="/diamond.png" alt="Page Logo" width={69} height={69} />
        </div>

        {/* Right side - Language selector (always visible) and Nav (on lg only) */}
        <div className="flex items-center gap-6">
          {/* Nav links - hidden on small screens */}
          <ul className="hidden lg:flex space-x-10 text-xl">
            {navLabels.slice(0, 5).map((label, idx) => (
              <li key={idx}>{label}</li>
            ))}
          </ul>

          {/* Language Dropdown */}
          <div className="relative ">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded"
            >
              <span>{LANGUAGES.find((l) => l.code === lang).name}</span>
              <img
                src={LANGUAGES.find((l) => l.code === lang).flag}
                alt="flag"
                width={28}
                height={28}
                className="rounded-sm"
              />
            </button>


            {dropdownOpen && (
              <div className="absolute mt-2 right-0 rounded text-black bg-white shadow-lg z-10">
                {LANGUAGES.map((l) => (
                  <div
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  >
                    <span>{l.name}</span>
                    <img src={l.flag} alt={l.name} className="rounded-sm" width={28} height={28} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown (hamburger) */}
        {(menuOpen || animating) && (
          <div
            className={`absolute top-full left-0 w-2/4 lg:hidden bg-white z-20  ${
              menuOpen ? "roll-down" : "roll-up"
            }`}
          >
            <ul className="flex flex-col gap-4 py-4 px-4 text-lg text-black">
              {["Home", "About", "Contact", "Blog", "Help"].map((label, idx) => (
                <li key={idx}>{label}</li>
              ))}
            </ul>
          </div>
        )}

      </div>


      {/* Terms Section */}
      <div className="mb-4 flex flex-col items-center max-w-[95%] lg:max-w-7/12">
        <h2 className="font-bold text-3xl text-center">{navLabels[6]}</h2>

        <button className="sm:px-20 px-10 font-bold mb-8 mt-4 py-4 text-lg bg-green-600 text-white rounded-full">
          {navLabels[7]}
        </button>

          <p className="bg-white text-sm text-gray-700 whitespace-pre-wrap text-center p-10 rounded-2xl ">{termsText}</p>

        <button className="sm:px-20 px-10 font-bold mb-8 mt-4 py-4 text-lg bg-green-600 text-white rounded-full">
          {navLabels[7]}
        </button>
      </div>
    </div>
  );
}
