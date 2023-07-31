
import React from 'react'
import { ImageRoute } from '../../Components/ImageRoute'
import { useRoute } from '@react-navigation/native';
import { Transport } from './Transport';

export const BlankTransport = () => {

    const routeParams = useRoute();
    const {routeId}= routeParams.params;
    const {idTravel}= routeParams.params;
  return (
      <>
    {
        idTravel ?(
            <Transport idtravel={idTravel}>
            </Transport>

):routeId?(<ImageRoute
nav={'CreateTransport'}
routeId={routeId}
schema={'transport'}
routeschema={'uploadImage'}
>

</ImageRoute>):(<Transport></Transport>)
}
</>   
  )
}
