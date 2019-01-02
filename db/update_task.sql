update tasks
set complete_by = $3
where task_id = $1;

update tasks
set description = $4
where task_id = $1;

update tasks 
set complete = $2
where task_id = $1;

select * from tasks
where user_id = $5;

