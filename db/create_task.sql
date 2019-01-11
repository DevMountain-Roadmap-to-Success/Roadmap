insert into tasks (user_id, task, complete, date)
values ($1, $2, $3, $4);



select * from tasks
where user_id = $1
and date <= current_date
order by date asc;