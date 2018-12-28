update tasks
set complete = $1
where task_id = $2;

select * from tasks
where user_id = $3
order by date_created asc