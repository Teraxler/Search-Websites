import React, { useEffect, useState } from "react";
import { getAutoCompeleteSuggestions } from "../../services/autoComplete.service";
import { CgSearch } from "react-icons/cg";
import SuggestionItem from "./SuggestionItem";
import { Link, useNavigate, useParams } from "react-router";
// import searchResult from "../../data/autocomplete.json";

export default function SearchBar() {
  const params = useParams();
  const [searchValue, setSearchValue] = useState(params.q ?? "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId = null;

    if (searchValue.trim()) {
      timeoutId = setTimeout(async () => {
        const result = await getAutoCompeleteSuggestions(searchValue);
        setSuggestions(result);
        // setSuggestions(searchResult.suggestions);
      }, 250);
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  function searchHandler(event) {
    event.preventDefault();

    navigate(`/results/${params.type ?? "all"}/${searchValue}`);
    setShowSuggestions(false);
  }

  function navigateHandler(newValue) {
    setSearchValue(newValue);
    setShowSuggestions(false);
  }

  return (
    <div id="search-bar" className="w-146 h-12 max-w-full relative z-10">
      <div className="w-full absolute shadow-search-bar rounded-3xl bg-white focus-within:*:block">
        <form action="" onSubmit={searchHandler}>
          <div className="w-full flex relative">
            <CgSearch
              className="absolute start-3.75 top-1/2 -translate-y-1/2 size-5 cursor-pointer"
              onClick={searchHandler}
            />
            <input
              id="search"
              placeholder="جست‌وجو کنید ..."
              className="w-full ps-13.75 pe-30 h-12 outline-0 rounded-3xl"
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
              onFocus={() => setShowSuggestions(true)}
              title="Search"
              type="search"
            />
            <Link
              // to={`/results/ai/${searchValue}`}
              className="absolute end-4 top-1/2 -translate-y-1/2 flex gap-x-0.75 items-center justify-center text-eerie-black bg-[#f3f5f6] rounded-full h-8 ps-2 py-2 pe-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="19px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#e3e3e3"
                className="invert"
              >
                <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q26 0 49.5 5t45.5 15l-57 56q-9.32-2-18.64-3T384-744q-70 0-119 49t-49 119q0 70 49 119t119 49q58 0 102-33.5t59-86.5h74q-5 26-16 49.5T577-434l239 239-51 51Zm-69-336q0-90.33-62.84-153.16Q570.33-696 480-696q90.33 0 153.16-62.84Q696-821.67 696-912q0 90.33 62.84 153.16Q821.67-696 912-696q-90.33 0-153.16 62.84Q696-570.33 696-480Z" />
              </svg>
              هوش مصنوعی
            </Link>
          </div>
        </form>
        {suggestions?.length && showSuggestions ? (
          <ul className="max-h-110 overflow-x-hidden overflow-y-auto mb-3 hidden">
            {suggestions.map((suggest) => (
              <SuggestionItem
                key={suggest.value}
                value={suggest.value}
                onClick={navigateHandler}
              />
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
