SELECT * FROM friends
join student
on friends.friend_id = student.user_id 
where student.user_id = $1
and student.user_id not in (select friends.user_id from friends)