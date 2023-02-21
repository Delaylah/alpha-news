import Images from "@/const/images";
import { Post } from "@/types/Post";
import styled from "@emotion/styled";
import router from "next/router";
import React from "react";
import Image from "next/image";

interface PostProps{
post: Post;
softDelete: (slug: string) => void;
};

function PostCard({post, softDelete}: PostProps): JSX.Element {
  return (
    <Card>
      <CardImage
        src={`https://www.alpha-orbital.com/assets/images/post_img/${post.post_image}`}
        alt="Card image"
        onClick={() =>
          router.push(`https://www.alpha-orbital.com/news/${post.slug}`)
        }
      />
      <CardContent>
        <StyledImage
          src={Images.CLOSE} alt={""} height={32} width={32} 
          onClick={()=>softDelete(post.slug)} />

        <CardTitle href={`https://www.alpha-orbital.com/news/${post.slug}`}>
          {post.title}
        </CardTitle>
        <CardDate>{post.date.toString()}</CardDate>
        <CardDescription dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <CardLinkContainer>
          <CardLink href={`https://www.alpha-orbital.com/news/${post.slug}`}>
            Full article
          </CardLink>
        </CardLinkContainer>
      </CardContent>
    </Card>
  );
}

export default PostCard;

//#region Styles

const StyledImage= styled(Image)`
display: flex;
align-self: flex-end;
margin-right: -10px;
margin-top: -20px;
cursor:pointer;

&:hover {

  background-color: #50acf9;
  border-radius:  5px;
}
`;

const Card = styled.div`
  display: flex;
  background-color: #000;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardImage = styled.img`
  width: 50%;
  padding: 30px 20px;
  height: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardContent = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardTitle = styled.a`
  font-size: 24px;
  margin: 0 0 10px;
`;

const CardDate = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0 0 10px;
`;

const CardDescription = styled.div`
  font-size: 16px;
  margin: 0 0 20px;
`;

const CardLinkContainer = styled.div`
  display: flex;
  flex-flow: row-reverse;
`;

const CardLink = styled.a`
  text-decoration: none;
  color: #50acf9;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }
`;

//#endregion
