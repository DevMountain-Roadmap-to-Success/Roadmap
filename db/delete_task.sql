delete from tasks
where task_id = $1; 

select * from tasks
where user_id = $2