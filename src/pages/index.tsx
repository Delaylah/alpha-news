import styled from "@emotion/styled";
import SearchInput from "@/components/SearchInput";
import PostCard from "@/components/PostCard";
import CategoryMenu from "@/components/CategoryMenu";
import { dehydrate, QueryClient, useQuery, useQueryClient } from "react-query";
import { Post } from "@/types/Post";
import { fetchData } from "@/helpers/fetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { filterData } from "@/helpers/filterData";
import ConfirmationModal from "@/components/ConfirmationModal";
import useModal from "@/hooks/useModal";
import PostsLoader from "@/components/PostsLoader";

interface HomeProps {
  dataProps: Post[];
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["last100Posts"], () => fetchData());
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
}

export default function Home({ dataProps }: HomeProps) {
  const queryKey = "last100Posts";
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, status } = useQuery<Post[]>({
    queryKey: [queryKey],
    queryFn: fetchData,
    //initialData: dataProps,
  });

  const [newData, setNewData] = useState<Post[]>(() =>
    filterData(data!, router.query)
  );

  const [counter, setDataCounter] = useState(0);

  const {
    isShowing: isShowingModal,
    postId: modalPostId,
    toggle: toggleModal,
  } = useModal();

  useEffect(() => {
    if (data) {
      const filteredData = filterData(data, router.query);
      setDataCounter(filteredData.length);
      setNewData(filteredData);
    }
  }, [data, router.query]);

  function deletePost(slug: string) {
    const newDataAfterDeletion = data?.filter((i) => i.slug !== slug);
    queryClient.setQueryData(queryKey, newDataAfterDeletion);
  }

  function refetchQuery() {
    queryClient.refetchQueries(queryKey);
  }

  function deleteCategoryHandler(id: number) {
    const newDataAfterDeletion = data?.filter((i) => i.post_category_id != id);
    queryClient.setQueryData(queryKey, newDataAfterDeletion);
  }

  return (
    <Container>
      <CategoryMenu categoryDelete={deleteCategoryHandler} />
      <SearchInput />
      {status === "loading" && (
      
        <Content>  
          <PostsLoader />
          <PostsLoader />
        </Content>
      )}
      {status === "error" && <Error>Error fetching data</Error>}
      {status === "success" && (
        <>
          <Counter>
            <>
              <p>Currently showing {counter} articles</p>
              {!router.query.filter && counter < 100 && (
                <Button onClick={refetchQuery}>Refetch</Button>
              )}
            </>
          </Counter>
          <Content>
            {newData.map((post: Post) => (
              <PostCard
                key={post.title}
                post={post}
                softDelete={() => toggleModal(post.slug)}
              />
            ))}
          </Content>
        </>
      )}

      <ConfirmationModal
        isShowing={isShowingModal}
        id={modalPostId}
        hide={toggleModal}
        deleteConfirmed={deletePost}
      />
    </Container>
  );
}

//#region Styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Error = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  padding: 20px;
  color: #ba3939;
  background: #ffe0e0;
  border: 2px solid #a33a3a;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 25px 20%;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 768px) {
    margin: 10px 5%;
  }
`;

const Counter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: white;

  margin: 25px 20%;
  justify-content: end;
`;

const Button = styled.button`
  padding: 7px 7px;
  background-color: #50acf9;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`;

const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
`;

const Loader = styled.div`
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background: #fff;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;

  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`;

//#endregion
