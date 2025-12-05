import { axionInstance } from "./axiosInstance";

export const getSeo = async (page,innerPage="")=>{
    try {
        const res = await axionInstance.get(`/seo/get-seo?page=${page}&innerPage=${innerPage}`)        
        return res.data.data
    } catch (error) {
        console.error(error);
        
    }
}
export const contact = async (contactData)=>{
    try {
        
        const res = await axionInstance.post(`/enquiry/save-enquiry`,contactData)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const gallery = async ()=>{
    try {
        
        const res = await axionInstance.get(`/gallery/get-images`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const faqs = async (faqs)=>{
    try {
        
        const res = await axionInstance.get(`/faq/get-all-faqs/${faqs}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}