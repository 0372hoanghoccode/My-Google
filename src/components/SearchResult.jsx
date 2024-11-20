import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchDataFromApi } from "../utils/api";
import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import SearchedImageItemTemplate from "./SearchedImageItemTemplate";
import Pagination from "./Pagination";
import { Context } from "../utils/ContextApi";

const SearchResult = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const { query, startIndex } = useParams();
  const { imageSearch } = useContext(Context);

  useEffect(() => {
    fetchSearchResults();
    window.scrollTo(0, 0);
  }, [query, startIndex, imageSearch]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      let payload = { q: query, start: startIndex };
      if (imageSearch) {
        payload.searchType = "image";
      }
      const data = await fetchDataFromApi(payload);
      setResult(data);
    } catch (error) {
      toast.error('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!result) return null;

  const { items, queries, searchInformation } = result;

  return (
    <div className="flex flex-col min-h-screen">
      <SearchResultHeader />
      <main className="flex-grow p-4 md:px-8">
        <div className="text-sm text-gray-600 mb-4">
          {`About ${searchInformation.formattedTotalResults} results in (${searchInformation.formattedSearchTime} seconds)`}
        </div>

        {!imageSearch ? (
          <div className="space-y-8">
            {items?.map((item, index) => (
              <SearchedItemTemplate key={index} data={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items?.map((item, index) => (
              <SearchedImageItemTemplate key={index} data={item} />
            ))}
          </div>
        )}

        <Pagination queries={queries} />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SearchResult;