delete from friends
where user_id = $1 and friend_id = $2;

delete from friends
where user_id = $2 and friends_id = $1