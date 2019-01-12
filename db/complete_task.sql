update tasks
set complete = $1
where task_id = $2;

select * from tasks
where user_id = $3
and date <= current_date
order by date asc;