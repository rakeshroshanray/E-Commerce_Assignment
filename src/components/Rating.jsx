
import React from 'react'
function Rating({rating}) {
  return (
    <div>{Array(Math.round(rating)).fill(" ").map((_,idx)=>{
     return <span key={idx} style={{ color: "gold" }}>
     &#x2605;
   </span>
    })}</div>
  )
}

export default Rating;