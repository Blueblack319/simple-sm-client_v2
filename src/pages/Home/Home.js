import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Container } from "semantic-ui-react";

import "./Home.css";
import PostCard from "../../components/PostCard/PostCard";

const FETCH_POSTS = gql`
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
  const { loading, error, data: { getPosts } = {} } = useQuery(FETCH_POSTS); // Compare with original code!

  return (
    <div className='home'>
      <Grid columns={3}>
        <Grid.Row className='home__title'>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            getPosts.map((post) => (
              <Grid.Column>
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
