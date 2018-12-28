insert into tasks (user_id, task, complete, date_created)
values ($1, $2, $3, $4);



select * from tasks
where user_id = $1
order by date_created asc