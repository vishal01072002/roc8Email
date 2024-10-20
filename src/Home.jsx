import React, { useState } from 'react'
import Mailbox from './components/Mailbox'

const Home = () => {
  const [filter, setFilter] = useState("");

  const updateFilter = (newFilter)=> {
    if(filter === newFilter){
      setFilter("");
    }
    else{
      setFilter(newFilter);
    }
  }
  return (
    <div className='px-10 py-6 w-full h-full flex flex-col items-start gap-5'>
        {/* filter div */}
        <div className='flex gap-2'>
            <p className='font-medium'>Filter By:</p> 
            <button className={`${filter === "unread" ? "bg-filterbtn-1" : ""} px-3 rounded-xl text-sm`} onClick={() => updateFilter("unread")}>Unread</button>
            <button className={`${filter === "read" ? "bg-filterbtn-1" : ""} px-3 rounded-xl text-sm`} onClick={() => updateFilter("read")}>Read</button>
            <button className={`${filter === "favorite" ? "bg-filterbtn-1" : ""} px-3 rounded-xl text-sm`} onClick={() => updateFilter("favorite")}>Favorites</button>
        </div>
        <Mailbox filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default Home