import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { InputHTMLAttributes, useEffect, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
}

const SearchInput = ({type, placeholder }: InputProps) => {

  const router = useRouter();
  const [ inputValue, setInputValue]= useState("");


/*Ignore the search term if it's shorter than 3 letters*/
/*If there is no search input or search term is shorter than 3 letters, display articles that match
currently selected category*/
  function handleFilterChange(filterString: string) {
    setInputValue(filterString);
    if (filterString.length > 2) {
      router.push({
        query: { ...router.query, query: filterString },
      });
    } else {
     const { pathname, query } = router;
      delete query.query;
      router.push({
        pathname,
        query,
      })
    }
  }

  useEffect(() => {
    if(router.query.query){
      setInputValue(router.query.query as string);
    }
  }, [router.query.query]);

  return (
    <SearchBox>
      <Input
        type={type}
        value={inputValue}
        placeholder="Search"
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      <Button title="I'm on design, but super useless.">SEARCH</Button>
    </SearchBox>
  );
};
export default SearchInput;

//#region Styles

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-right: 20%;
  margin-left: 20%;
  @media (max-width: 768px) {
   margin-top:100px;
  }
`;

const Input = styled.input`
  padding: 15px;
  border: none;
  width: 100%;
  border-radius: 5px 0 0 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #50acf9;
  border: none;
  color: white;
  border-radius: 0 5px 5px 0;
`;
//#endregion
