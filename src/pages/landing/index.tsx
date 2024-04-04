import { scrolltoHash } from '@lib/utils'
import { Header } from '@components'
import React, { useState } from 'react'



export default function Landing() {
    const [route, setRoute] = useState<string>("Home")
    
  return (
    <main className='flex flex-col'> 
    <Header className='' route={route} setRoute={setRoute}/>
    
    </main>
  )
}
