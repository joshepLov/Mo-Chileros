import React from 'react'
import { ImageRoute } from '../../Components/ImageRoute'
import { useRoute } from '@react-navigation/native';
import { Room } from './Room';

export const BlankRoom = () => {
    const routeParams = useRoute();
    const {routeId}= routeParams.params;
    const {idTravel}= routeParams.params;
    console.log(routeId);
    console.log(idTravel);
  return (
    <>
    {
      routeId && idTravel ?(
        <Room id={routeId} idtravel={idTravel}></Room>
        
        ):(
            <ImageRoute
            nav={'home'}
            routeId={routeId}
            schema={'hotel'}
       routeschema={'uploadImageRoom'}
       ></ImageRoute> 

          )
        }
        </>
  )
}