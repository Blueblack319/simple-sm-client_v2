import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import "./Home.css";
import PostCard from "../../components/PostCard/PostCard";
import { AuthContext } from "../../context/auth";
import PostForm from "../../components/PostForm/PostForm";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

const Home = () => {
  const { userData } = useContext(AuthContext);
  const { loading, data: { getPosts } = {} } = useQuery(FETCH_POSTS_QUERY); // Compare with original code!
  return (
    <div className='home'>
      <Grid columns={3}>
        <Grid.Row>
          <h1 className='home__title'>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {userData && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Transition.Group duration={300}>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard
                    post={post}
                    imageSrc='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                  />
                </Grid.Column>
              ))
            )}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
