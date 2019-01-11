select task, task_id, priority from tasks
where date = $1
and time = $2
and user_id = $3; 
