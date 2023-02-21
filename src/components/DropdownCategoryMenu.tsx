import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { fetchData } from "@/helpers/fetchData";
import { useEffect, useState } from "react";
import Images from "@/const/images";
import { cleanCategoryItems } from "@/helpers/cleanCategoryItems";
import { CategoryItem } from "@/types/CategoryItem";
import { useQuery } from "react-query";

interface CategoryProps{
  categoryDelete: (category_id: number) => void;
};

export default function DropdownCategoryMenu({categoryDelete}:CategoryProps) {

  const { data, status } = useQuery("last100Posts", fetchData);
  const [show, setShow] = useState(false);
  const [newCategories, setNewData] = useState<CategoryItem[]>([]);

  useEffect(() => {
    if (data) {
      setNewData(cleanCategoryItems(data));
    }
  }, [data]);

  return (
      <Dropdown
        onMouseEnter={() => setShow(!show)}
        onMouseLeave={() => setShow(false)}
      >
        <Button id="nav-dropdown">
          Toggle
        </Button>
        <DropdownResults>
          {status === "success" &&
            show &&
            newCategories.map(
              (item) => (
                <DropdownResultContainer key={item.post_category_id}>
                  <StyledImage
                    src={Images.MENUCLOSE}
                    width={20}
                    height={20}
                    alt={""}
                    onClick={()=>categoryDelete(item.post_category_id)}
                  />
                  <Category
                    key={item.post_category_id}>
                    {item.category_name}
                  </Category>
                </DropdownResultContainer>
              )
            )}
        </DropdownResults>
      </Dropdown>

  );
}

//#region Styles

const Category = styled.a`
  display: flex;
  padding: 20px;
  text-decoration: none;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 15px 15px;
  border: none;
  color: black;
  cursor: pointer;
  border-radius: 5px;
`;

const Dropdown = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  border: none;
  color: white;
  position: absolute;
  flex-direction: column;
  cursor: pointer;
  border-radius: 5px;
`;

const DropdownResults = styled.div`
  display: flex;
  border: none;
  color: white;
  flex-direction: column;
  background-color: #50acf9;
  cursor: pointer;
  border-radius: 5px;
`;
const DropdownResultContainer = styled.div`
  display: flex;
`;

const StyledImage = styled(Image)`
  display: flex;
  cursor: pointer;
  margin: 20px 10px 0;

  &:hover {
    transform: scale(1.2);
  }
`;

//#endregion