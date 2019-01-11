insert into tasks(user_id, date, time, task, complete, priority)
values($1, $2, $3, $4, $5, $6 );

select * from tasks
where user_id = $1
and date = $2
and time = $3;