update tasks
set task = $2
where task_id = $1;

update tasks
set priority = $3
where task_id = $1;


select * from tasks
where task_id = $1;
