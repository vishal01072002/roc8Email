import React from 'react'
import formateDate from './dateFormater'

const OneMail = ({mail, clickedMail, setClickedMail}) => {
  const favoriteList = JSON.parse(localStorage.getItem(process.env.REACT_APP_FAVORITE));

  return (
    <div className={`flex px-5 ${favoriteList.includes(mail?.id)? "bg-favorite-1" : "bg-white"} py-2 mb-4 rounded-md gap-5 ${mail?.id === clickedMail ?  "border-accent-1" : "border-greyborder-1"} border w-full`} 
    onClick={() => setClickedMail(mail?.id)}>
        {/* image of sender */}
        <div>
            <div className='bg-accent-1 h-9 w-9 rounded-full flex items-center justify-center'>
                <p className='text-white text-lg font-medium'>{mail?.from?.name?.at(0).toUpperCase()}</p>
            </div>
        </div>

        {/* rest content */}
        <div className='text-xs flex flex-col items-start gap-1'>
            <div className='flex gap-1'>From: <p className='font-medium'>{mail?.from?.name} {`<${mail?.from?.email}>`}</p></div>
            <div className='flex gap-1'>Subject: <p className='font-medium'>{mail?.subject}</p></div>
            <p className='mt-1'>{clickedMail ? mail?.short_description.slice(0,45) + "..." : mail?.short_description}</p>
            <div className='mt-1 flex gap-5'>
              <p>{formateDate(mail?.date)}</p>
              {favoriteList.includes(mail?.id) && <p className='text-accent-1 font-medium'>Favorite</p> }
            </div>
        </div>
    </div>
  )
}

export default OneMail