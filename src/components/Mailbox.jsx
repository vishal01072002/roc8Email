import React, { useEffect, useState } from 'react'
import { fetchEmail, fetchEmailBody} from '../apiService/apiCall';
import OneMail from "./OneMail";
import formateDate from './dateFormater';

const Mailbox = ({filter, setFilter}) => {

  const [emailList,setEmailList] = useState([]);
  const [mail,setMail] = useState([]);
  const [totalMail, setTotalMail] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const perPageMail = 10;
  // for body

  const [clickedMail,setClickedMail] = useState(null);
  const [mailBody,setMailBody] = useState(null);

  const fetchEmailList = async(page) => {
    setLoading(true);
    const data = await fetchEmail(page);
    // console.log(data);
    setMail(data?.list);
    setFilter("");
    setEmailList(data?.list);
    setTotalMail(data?.total);
    setClickedMail(null);
    setMailBody(null);
    setLoading(false);
  }

  const goNext = ()=>{
    if(currentPage*perPageMail < totalMail){
      setCurrentPage((state) => state+1);
    }
  }

  const goPrev = ()=>{
    if(currentPage > 1){
      setCurrentPage((state) => state-1);
    }
  }

  const handleFilter = () => {
    if(filter === ""){
      setEmailList(mail);
      return;
    }
    // unread read favorite
    if(filter === "read"){
      const readed = JSON.parse(localStorage.getItem(process.env.REACT_APP_READED));
      const tempList = mail.filter((value) => {
        return readed.includes(value?.id);
      })
      setEmailList(tempList);
    }

    if(filter === "unread"){
      const readed = JSON.parse(localStorage.getItem(process.env.REACT_APP_READED));
      const tempList = mail.filter((value) => {
        return !(readed.includes(value?.id));
      })
      setEmailList(tempList);
    }
    
    if(filter === "favorite"){
      const favorited = JSON.parse(localStorage.getItem(process.env.REACT_APP_FAVORITE));
      const tempList = mail.filter((value) => {
        return favorited.includes(value?.id);
      })
      setEmailList(tempList);
    }

  }

  const mailBodyHandler = async()=>{
    if(clickedMail !== null){
      const bodyResponse = await fetchEmailBody(clickedMail);
      const info = mail.find((one) => one?.id === clickedMail);
      setMailBody({...bodyResponse, ...info});
      
      // added to read
      const readed = JSON.parse(localStorage.getItem(process.env.REACT_APP_READED));
      if(!(readed.includes(clickedMail))){
        const newRead = [...readed,clickedMail];
        // console.log(newRead);
        localStorage.setItem(process.env.REACT_APP_READED,JSON.stringify(newRead));
      }
    }
  }

  const handleCloseBody = ()=>{
    setMailBody(null);
    setClickedMail(null);
  }

  const handleFavorite = () => {
    if(clickedMail !== null){
      // added to read
      const favorites = JSON.parse(localStorage.getItem(process.env.REACT_APP_FAVORITE));
      if(!(favorites.includes(clickedMail))){
        const newFavorite = [...favorites,clickedMail];
        // console.log(newRead);
        localStorage.setItem(process.env.REACT_APP_FAVORITE,JSON.stringify(newFavorite));
        setMailBody((state) => ({...state}));
      }
    }
  }
  useEffect(()=> {
    handleFilter();
  },[filter]);

  useEffect(() => {
    fetchEmailList(currentPage);
  },[currentPage]);

  useEffect(() => {
    mailBodyHandler();
  },[clickedMail]);

  return (
    <>
    {
      (totalMail < 1 || loading)? <div className='text-center w-full text-lg font-medium pt-12'>Loading...</div> : 
      <>
        {
          (totalMail > 0 && emailList.length === 0) && <div className='mb-5 text-center w-full text-lg font-medium pt-12'>No Mail Found for {filter}</div>
        }

        <div className={`w-full ${mailBody !== null ? "flex gap-5 justify-between" : ""}`}>
          <div className={`${mailBody? "w-[30%]" : ""}`}>
            {emailList.map((mail) => (
              <OneMail mail={mail} key={mail?.id} clickedMail={clickedMail} setClickedMail={setClickedMail}></OneMail>
            ))}
          </div>
          {mailBody !== null && <div className='flex relative h-min gap-4 border border-greyborder-1 bg-white rounded-md px-5 py-7 w-[70%]'>
            <button className='text-white bg-red-600 absolute h-6 hover:bg-red-500 transition-colors duration-200 w-6 rounded-sm font-bold right-1 top-1'
            onClick={() => handleCloseBody()}>X</button>
            <div className='bg-accent-1 h-9 w-9 rounded-full flex items-center justify-center'>
                <p className='text-white text-lg font-medium'>{mailBody?.from?.name?.at(0).toUpperCase()}</p>
            </div>
            <div className='w-[90%] flex flex-col items-start gap-5'>
              <div className='flex w-full justify-between'>
                <p className='text-xl font-bold'>{mailBody?.subject}</p>
                <button className='text-sm rounded-xl px-3 text-white bg-accent-1 hover:bg-rose-500 transition-colors duration-200'
                onClick={() => handleFavorite()}>Marks as favorite</button>
              </div>
              <p className='text-sm'>{formateDate(mailBody?.date)}</p>
              <div className='text-start text-sm leading-[24px]' dangerouslySetInnerHTML={{ __html:  (mailBody?.body).split(`</p>`).join(`</p><br>`)}} />
            </div>
          </div>}
        </div>
        
        <div className={`flex items-start justify-between w-1/2`}>
          <div className='flex gap-4'>
            {(currentPage < Math.ceil(totalMail/perPageMail)) && <button 
            onClick={() => goNext()}
            className='px-5 py-1 border rounded-md border-gray-400 bg-gray-50 hover:bg-slate-100'>Next</button>}
            {(currentPage > 1) && <button 
            onClick={() => goPrev()}
            className='px-5 py-1 border rounded-md border-gray-400 bg-gray-50 hover:bg-slate-100'>Prev</button>}
          </div>
          <span className='pr-2'>{currentPage}/{Math.ceil(totalMail/perPageMail)} page</span>
        </div>
      </>
    }
    </>
  )
}

export default Mailbox