'use client'

import React from 'react';
import { signOut } from 'next-auth/react';

const page = () => {
  return (
    <div>
      user logged in :

      <div>
        <button onClick={()=> signOut()}>Sign out</button>
      </div>
      
    </div>
  );
};

export default page;