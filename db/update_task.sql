
update tasks 
set complete = $2
where task_id = $1;

update tasks 
set task = $3
where task_id = $1;

update tasks 
set date = $4
where task_id = $1;

update tasks
set priority = $5
where task_id = $1;

update tasks
set time = $6
where task_id = $1;

update tasks
set description = $7
where task_id = $1;

select * from tasks
where user_id = $8
and date <= current_date - 1;

