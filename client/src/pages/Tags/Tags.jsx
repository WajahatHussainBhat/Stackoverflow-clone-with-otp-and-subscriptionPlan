import React from 'react'
import LeftSideBar from "../../components/LeftSidebar/LeftSidebar"
import TagsList from "./TagsList"
import { tagsList } from './tagList'

const Tags = () => {
  return (
    <div className='home-container-1'>
      <LeftSideBar/>
      <div className="home-container-2 tags">
        <h1>Tags</h1>
        <p>A tag is a keyword or label that categorizes your question with other, similar questions.</p>
        <p>Using the right tags makes it easier for others to find and answer your questions.</p>
        <div className="tags-list-container">
          {tagsList.map((tag, index) => (
            <TagsList tag={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tags
