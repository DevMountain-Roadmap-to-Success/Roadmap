insert into tasks(user_id, date, time, task, complete, description, priority)
values($1, $2, $3, $4, $5, $6, $7 );

select * from tasks
where user_id = $1
and date = $2
and time = $3;