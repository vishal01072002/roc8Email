import { toast } from "react-toastify";
import { apiConnector } from "./apiConnector";

const emailPagination = process.env.REACT_APP_EMAIL_URL;
const emailBody = process.env.REACT_APP_EMAIL_BODY_URL;

export async function fetchEmail (page){
  const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector("GET",`${emailPagination}${page}`,null);

      if(!response || response.status !== 200){
          throw new Error("Something went Wrong");
      }
      else{
        toast.dismiss(toastId);
        //toast.success("Mails Fetched");
        return response?.data;
      }
    } catch (error) {
      toast.error(error);
    }
    toast.dismiss(toastId);
}

export async function fetchEmailBody (id){
  const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector("GET",`${emailBody}${id}`,null);
      
      if(!response || response.status !== 200){
          throw new Error("Something went Wrong");
      }
      else{
        toast.dismiss(toastId);
        //toast.success("Email Fetched");
        return response?.data;
      }
    } catch (error) {
      toast.error(error);
    }
    toast.dismiss(toastId);
}