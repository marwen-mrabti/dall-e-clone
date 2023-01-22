import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post.api";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  return data.length ? (
    data.map((post) => <Card key={post._id} post={post} />)
  ) : (
    <h2 className="text-[#6469ff] text-3xl font-medium">{title}</h2>
  );
};

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const PostQuery = useQuery(["posts", searchText], () => getPosts({ searchText }), {
    onSuccess: (data) => {
      setPosts(data);
    },
  });

  return (
    <div>
      <section className="max-w-7xl m-auto">
        <div>
          <h1 className="font-extrabold text-[222328] text-[3.2rem]">
            the community showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[1.6rem] max-w-[50rem]">
            Browse through a collection of imaginative and visually stunning images
            generated using openai's dall-e model.
          </p>
        </div>

        <div className="mt-10">
          <FormField
            labelName="search by name or prompt"
            type="text"
            name="search"
            placeholder="search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="mt-10">
          {PostQuery.isLoading ? (
            <div className="w-full p-5 flex justify-center items-start">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-3xl mb-3">
                  {" "}
                  showing results form{" "}
                  <span className="text-[#222328]">{searchText}</span>{" "}
                </h2>
              )}

              <div className="grid xs:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 cols-1 gap-3 ">
                {searchText ? (
                  <RenderCards data={posts} title="No results found" />
                ) : (
                  <RenderCards data={posts} title="No posts found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
