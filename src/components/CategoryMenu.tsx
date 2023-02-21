import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { fetchData } from "@/helpers/fetchData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cleanCategoryItems } from "@/helpers/cleanCategoryItems";
import { CategoryItem } from "@/types/CategoryItem";
import DropdownCategoryMenu from "./DropdownCategoryMenu";
import Images from "@/const/images";
import Image from "next/image";
import CategoryMenuLoader from "./CategoryMenuLoader";

interface CategoryProps {
  categoryDelete: (category_id: number) => void;
}

type CategoryStyleProps = {
  isActive?: boolean;
  isExpanded?: boolean;
};

export default function CategoryMenu({ categoryDelete }: CategoryProps) {
  const router = useRouter();
  const { data, status } = useQuery("last100Posts", fetchData);
  const [newCategories, setNewData] = useState<CategoryItem[]>([]);
  const [activeLink, setActiveLink] = useState("");
  const [expandedMenu, setExpandedMenu] = useState(false);

  useEffect(() => {
    if (data) {
      setActiveLink(router.query.filter as string);
      setNewData(cleanCategoryItems(data));
    }
  }, [data, router.query.filter]);

  
  function handleFilterChange(filterString: any) {

    let newQuery = { ...router.query, filter: filterString };

    if(!filterString){
      delete newQuery.filter;
    };
    router.push(
      {
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  }

  function checkIfActive(id: number) {
    return activeLink == (id as unknown as string);
  }

  return (
    <div style={{ display: "flex" }}>
      <Hamburger
        src={Images.HAMBURGER}
        alt={"proba"}
        height={50}
        width={50}  
        onClick={() => setExpandedMenu(!expandedMenu)}
      />

      <Categories isExpanded={expandedMenu}>
        {status === "loading" && <CategoryMenuLoader/>}
        {status === "error" && <Error>Error fetching data</Error>}
        {status === "success" && (
        <>
          {newCategories.map((item) => 
            <Category
              isActive={checkIfActive(item.post_category_id)}
              key={item.post_category_id}
              onClick={(e) => handleFilterChange(item.post_category_id)}
            >
              {item.category_name}
            </Category>
          )}
          <LinkCategoryItem
          isActive={activeLink == undefined}
          onClick={(e) => handleFilterChange(null)}>See all</LinkCategoryItem>
        </>
      )}

       
      </Categories>

      <DropdownCategoryMenu categoryDelete={categoryDelete} />
    </div>
  );
}

//#region Styles

const Error = styled.div`
  margin: 0 auto;
  padding: 20px;
  color: #ba3939;
  background: #ffe0e0;
  border: 2px solid #a33a3a;
`;

const Hamburger = styled(Image)<CategoryStyleProps>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    padding: 5px 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    margin-top: 20px;
  }
`;

const Categories = styled.nav<CategoryStyleProps>`
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 0px;
  flex-wrap: wrap;
  margin: 0 100px;

  @media (max-width: 768px) {
    display: ${(props) => (props.isExpanded ? "absolute" : "none")};
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 20px;
    margin-bottom: ${(props) => (props.isExpanded ? "-70px" : "")};
  }
`;

const Category = styled.div<CategoryStyleProps>`
  display: flex;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
  color:  ${(props) => (props.isActive ? "#50acf9" : "white")};

  &:hover {
    color: yellow;
  }
}
`;

const LinkCategoryItem = styled.div<CategoryStyleProps>`
  padding: 20px;
  text-decoration: underline #50acf9;
  color: ${(props) => (props.isActive ? "#50acf9" : "white")};
  cursor: pointer;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

//#endregion