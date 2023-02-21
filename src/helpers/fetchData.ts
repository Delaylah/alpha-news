
//Fetch 100 of latest news articles
export async function fetchData() {
const response = await fetch(
    "https://www.alpha-orbital.com/last-100-news.json"
  );
  const data = await response.json();
  return data;
};