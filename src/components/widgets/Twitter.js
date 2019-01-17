import React from 'react'
import {TwitterTimelineEmbed, TwitterTweetEmbed} from 'react-twitter-embed'





export const TwitterTweet = (props) => {
    return (

             <TwitterTweetEmbed
    tweetId={props.id}
    options={{height: 300, width: 500}}
  />


    )
}

