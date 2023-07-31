import React from 'react'
import { ImageRoute } from '../../Components/ImageRoute'
import { useRoute } from '@react-navigation/native';

export const BlankRoute = () => {
    
    const routeParams = useRoute();
    const {routeId}= routeParams.params;
    console.log(routeId);
  return (
   <ImageRoute
   nav={'CreateTravel'}
   routeId={routeId}
   schema={'route'}
   routeschema={'uploadImage'}
   ></ImageRoute> 
  )
}
