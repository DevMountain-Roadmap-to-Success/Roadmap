
update tasks 
set 
complete = $2,
 task = $3,
 date = $4,
 priority = $5,
time = $6,
description = $7
where task_id = $1;


select * from tasks
where task_id = $1;



