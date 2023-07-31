import React from 'react'
import { ImageRoute } from '../../Components/ImageRoute'
import { useRoute } from '@react-navigation/native';
import { Hotel } from './Hotel';


export const BlankHotel = () => {
    const routeParams = useRoute();
    const {routeId}= routeParams.params;
    const {idTravel}= routeParams.params;
    console.log(routeId);
    console.log(idTravel, 'ESTE ES EL VIAJE');
  return (
    <>
    {routeId ? (
        <ImageRoute
        nav={'Room'}
        routeId={routeId}
        schema={'hotel'}
        routeschema={'uploadImageRoom'}
        ></ImageRoute> 

    ):idTravel?(
        <Hotel id={idTravel}>
        </Hotel>
    ):(
        <Hotel/>
    )}
    </>
  )
}