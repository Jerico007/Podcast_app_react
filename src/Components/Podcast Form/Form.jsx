import FileInput from "../Podcast Image File Input/FileInput";
import {storage,db} from "../../firebase";
import { collection,doc,setDoc } from "firebase/firestore";
import { getDownloadURL, ref,uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { useReducer } from "react";
import { useSelector } from "react-redux";

import "./Form.css";
const Form = () => {

    //use Selector for current user id
    const {user} = useSelector(state => state.user);


    //useReducer for managing form state
    const [formState,formDispatch] = useReducer(FormReducer , {PodcastTitle:"",PodcastDescription:"",BannerImage:"",smallImage:"",loading:false})

    function FormReducer (state,action)
    {
        if(action.type === "TITLE")
        {      
            return {...state,PodcastTitle:action.payLoad};
        }
        else if(action.type === "DESCRIPTION")
        { 
            return {...state,PodcastDescription:action.payLoad};
        }
        else if(action.type === "BANNER")
        {  
            return {...state,BannerImage:action.payLoad};
        }
        else if(action.type === "SMALL")
        {
            return {...state,smallImage:action.payLoad};
        }
        else if(action.type === "SUCCESS")
        {
            return {...state,PodcastTitle:"",PodcastDescription:"",BannerImage:"",smallImage:""};
        }
        else if(action.type === "LOADING")
        {
            return {...state,loading : action.payLoad};
        }
        return state;
    }

    
    //Function to validate form and upload user data to Firebase storage
    async function validateForm(){
        if(formState.PodcastTitle === "" || formState.PodcastDescription === "" || formState.BannerImage === "" || formState.smallImage === "")
        {
            toast.error("Please complete the form!");
        }
        else {
            // toast.success("Podcast Created!");
            // formDispatch({type:"SUCCESS"});
            const BannerImageRef = ref(storage ,`images/${user.uid}/${Date.now()}`);
            const SmallImageRef = ref(storage,`images/small_images/${user.uid}/${Date.now()}`);
            try{
                    formDispatch({type:"LOADING",payLoad:true});
                    await uploadBytes(BannerImageRef,formState.BannerImage);
                    await uploadBytes(SmallImageRef,formState.smallImage);
                    const BannerImageURL = await getDownloadURL(BannerImageRef);
                    const SmallImageURL = await getDownloadURL(SmallImageRef);

                    const newPodcast ={
                        title : formState.PodcastTitle,
                        description : formState.PodcastDescription,
                        bannerImage : BannerImageURL,
                        smallImage : SmallImageURL
                    }

                     await setDoc(doc(collection(db,"Podcast")),newPodcast);
                  
                    toast.success("Podcast Uploaded!");
                    formDispatch({type:"LOADING",payLoad:false});
                     formDispatch({type:"SUCCESS"});
            }
            catch(e){
                toast.error(e.message);
                formDispatch({type:"LOADING",payLoad:false});
            }
        }
    }
    
    //Function to handle form submit
    function handelSubmit(e){
        e.preventDefault();
        if(formState.loading)
        {
            return;
        }
        validateForm();
    }
 
    return (
        <div className='Form'>
            <h1>Create A Podcast</h1>
            <form onSubmit={handelSubmit}>
            <input type="text" onInput={(e)=>{formDispatch({type:"TITLE",payLoad:e.target.value})}} value={formState.PodcastTitle} placeholder="Podcast Title"></input>
            <input type="text" onInput={(e)=>{formDispatch({type:"DESCRIPTION",payLoad:e.target.value})}} value={formState.PodcastDescription} placeholder="Podcast Description"></input>
            <FileInput id={"Banner-img"}  accept={"image/*"} name={"Banner"} callback={formDispatch} />
            <FileInput id={"Small-img"} accept={"image/*"} name={"Small"} callback={formDispatch} />
            {
                formState.loading? <button className="Loading">Loading...</button> : <button type="submit">Create Now</button>
            }
          
           </form>    
        </div>
    );
}

export default Form;
