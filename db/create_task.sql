insert into tasks (user_id, task, complete, date, time)
values ($1, $2, $3, $4, $5);



select * from tasks
where user_id = $1
and date <= current_date
order by date asc;