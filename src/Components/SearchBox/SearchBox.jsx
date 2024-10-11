import React from 'react'
import "./SearchBox.css"
import { IoSearch } from "react-icons/io5";

export default function SearchBox() {
  return (
    <div className="SearchBox position-relative d-flex align-items-center">
        <IoSearch />
        <input type="text" placeholder='جستجو کنید'/>
    </div>
  )
}
