export const getHashnodePosts = async () => {
    const username = "rafaeldavish";

    const query = JSON.stringify({
      query: `{
              user(username: "${username}") {
              publication {
              posts {
                  _id
              title
              slug
              brief
              dateAdded
              dateUpdated
              readTime
              }
              }
          }
          }`,
    });

    const response = await fetch(`https://api.hashnode.com/`, {
      method: "POST",
      body: query,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    const articles = json.data.user.publication.posts;

    return articles;
  };
