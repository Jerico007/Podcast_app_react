// React library
import { useEffect } from 'react';
// Navbar component
import NavBar from '../Components/Navbar/NavBar';
// Commmon component
import Input from "../Components/Common components/Input/Input";
// Firebase library component
import { onSnapshot ,collection} from 'firebase/firestore';
// imported firebase file
import { db } from '../firebase';
// Redux slice
import {setPodcasts} from '../Slices/podcastsSilce';
// React redux
import { useDispatch,useSelector } from 'react-redux';


const Podcasts = () => {

    const dispatch = useDispatch();
    const {podcasts} = useSelector(state => state.podcasts);

    // Getting the list of podcasts that are currently available
    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db,"Podcast"),(snapshot)=>{
            const podcasts = [];
            snapshot.forEach((doc)=>{
               
                podcasts.push(doc.data());
            })
            dispatch(setPodcasts(podcasts));
        })
        return ()=>{
            unsubscribe();
        }
    },[dispatch]);

    return (
        <div className='Podcasts'>
            <NavBar/>
            <div className='Podcasts-holder'>
            <h1 className='Podcasts-heading'>Discover Podcasts</h1>
            <Input type='text' placeholder={"Search for a title"} className={"Podcasts-search"}/>
            </div>
        </div>
    );
}

export default Podcasts;
