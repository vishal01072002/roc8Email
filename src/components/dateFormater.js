const formateDate = (d)=>{
    if(!d) return "";
    const date = new Date(d).toLocaleString();
    const time = date.split(",").at(1).substring(0,5) + date.split(",").at(1).substring(9,11).toLocaleLowerCase();

    return date.split(",").at(0) + time;
}

export default formateDate;