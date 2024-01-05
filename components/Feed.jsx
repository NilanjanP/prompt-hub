"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import SearchIcon from './SearchIcon';




export const PromptCardList = ({ data, handleClick }) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleClick={handleClick}/>
      ))}
    </div>
  )
}




const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ posts, setPosts ] = useState([]);
  const [ searchedPost, setSearchedPost ] = useState([]);

  const [ isHover, setHover] = useState(false)

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }
    
    fetchPosts();
  }, [])

  
  if(isHover) {
    setTimeout(() => {
      setHover(false)
    }, 1500);
  }


  const handleSearchChange = (e) => {
    e.preventDefault();

    if(searchText.length <= 0) return;

    if (searchText[0] === "#") {
      const result = posts.filter((item) => item.tag == searchText);

      setSearchedPost(result);
    } else {

      const result = posts.filter((item) =>
        item.creator.username
          .toLowerCase()
          .match(searchText.toLocaleLowerCase())
      );
      console.log(result)
      setSearchedPost(result);
    }
  };


  return (
    <section className="feed">
      <form className="flex gap-2 w-full">
        <input
          type="text"
          placeholder={
            (isHover && "Enter a space after search") ||
            "Search for a tag or a username"
          }
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
          onMouseOver={(e) => setHover(!isHover)}
        />
        <span
          onClick={(e) => handleSearchChange(e)}
          className="bg-white px-2 flex items-center text-black/40 rounded-lg shadow-lg border border-gray-200 cursor-pointer"
        >
          <SearchIcon className=" w-6 " />
        </span>
      </form>

      {searchedPost && (
        <div className="">
          <span className=" text-xl font-semibold text-gray-600 ">
            {searchedPost.length > 0 && "Searched Results"}
          </span>
          <div className="-mt-[70px] ">
            <PromptCardList data={searchedPost} handleClick={() => {}} />
          </div>
        </div>
      )}

      <div className="">
        <span className=" text-xl font-semibold text-gray-600">Feed</span>
        <div className="-mt-[70px]">
          <PromptCardList data={posts} handleClick={() => {}} />
        </div>
      </div>
    </section>
  );
}

export default Feed