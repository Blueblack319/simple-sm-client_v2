import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import "./Home.css";
import PostCard from "../../components/PostCard/PostCard";
import { AuthContext } from "../../context/auth";
import PostForm from "../../components/PostForm/PostForm";

const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      userName
      createdAt
      comments {
        id
        userName
        body
        createdAt
      }
      commentsCount
      likes {
        id
        userName
        createdAt
      }
      likesCount
    }
  }
`;

const Home = () => {
  const { userData } = useContext(AuthContext);
  const { loading, data: { getPosts } = {} } = useQuery(FETCH_POSTS_QUERY); // Compare with original code!
  return (
    <div className='home'>
      <Grid columns={3}>
        <Grid.Row className='home__title'>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {userData && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            getPosts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
