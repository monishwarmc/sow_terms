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
    <div className="p-6 max-w-9/12 mx-auto">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8 relative">
        {/* Hamburger for mobile (replaces logo on small screens) */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
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
          <div className="relative">
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
        {menuOpen && (
          <div className="absolute top-full left-0 w-2/4 lg:hidden bg-white z-20 shadow-md animate-slide-down transition-all duration-300">
            <ul className="flex flex-col  gap-4 py-4 px-4 text-lg text-black">
              {navLabels.slice(0, 5).map((label, idx) => (
                <li key={idx}>{label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>


      {/* Terms Section */}
      <div className="mb-4 flex flex-col items-center">
        <h2 className="font-bold text-3xl text-center">{navLabels[6]}</h2>

        <button className="sm:px-20 font-bold mb-8 mt-4 py-4 sm:text-lg text-sm bg-green-600 text-white rounded-full">
          {navLabels[7]}
        </button>

        <div className="bg-white rounded-2xl mx-auto p-6 sm:p-10 text-gray-700 font-medium text-[16px] leading-relaxed lg:w-7/12 w-10/12 max-w-5xl shadow-md text-center">
          <p className="whitespace-pre-wrap text-center">{termsText}</p>
        </div>

        <button className="sm:px-20 font-bold mb-8 mt-4 py-4 sm:text-lg text-sm bg-green-600 text-white rounded-full">
          {navLabels[7]}
        </button>
      </div>
    </div>
  );
}
