
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
where time = $6
and date = $4
and user_id = $8;



