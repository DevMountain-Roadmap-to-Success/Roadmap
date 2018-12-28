select * from tasks
where user_id = $1
order by date_created asc