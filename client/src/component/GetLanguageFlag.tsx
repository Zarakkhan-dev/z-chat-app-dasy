import { LANGUAGE_TO_FLAG } from "../lib/constant";

function GetLanguageFlag(language: string) {
  if (!language) return null;

  const langLower = language.toLowerCase() as keyof typeof LANGUAGE_TO_FLAG;
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}

export default GetLanguageFlag