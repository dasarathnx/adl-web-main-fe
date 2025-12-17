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
export const blogs = async (page,limit=8)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-blogs?page=${page}&limit=${limit}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const blogByUrl = async (blogUrl)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-blog/${blogUrl}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}
export const blogInnerPage = async (subCategory)=>{
    try {
        
        const res = await axionInstance.get(`/blog/get-innerPage-blog/${subCategory}`)        
        return res.data
    } catch (error) {
        console.error(error);
        
    }
}

export const getHeroSection = async () => {
    try {
        const response = await axionInstance.get(`/herosection/get-herosection`)
        return response.data
    } catch (error) {
        console.error(error);

    }
}
export const getFreezonePackages = async (url) => {
    try {
        const response = await axionInstance.get(`/packages/category-packages/${url}`)
        return response.data
    } catch (error) {
        console.error(error);

    }
}   