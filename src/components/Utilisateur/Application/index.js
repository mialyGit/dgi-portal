import React from 'react'
import Aux from "hoc/_Aux";
import { useParams } from 'react-router-dom';

const UserApp = () => {
  const { name, method } = useParams();
  return (
    <Aux>
      <div>{name} {method} </div>
    </Aux>
  )
}

export default UserApp;