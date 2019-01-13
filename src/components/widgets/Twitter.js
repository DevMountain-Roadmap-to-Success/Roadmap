import React from 'react'
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed'



const Twitter = () => {
    return (
        <div>
               <TwitterTimelineEmbed
  sourceType="profile"
  screenName="reactjs"
  options={{height: 400, width: 400}}
/> 

</div>
    )
}
export default Twitter

export const TwitterTweet = (props) => {
    return (

             <TwitterTweetEmbed
    tweetId={props.id}
    options={{height: 300, width: 500}}
  />


    )
}

