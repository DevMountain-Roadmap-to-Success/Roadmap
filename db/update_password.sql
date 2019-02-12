update student
set password = $2
where user_id = $1;

select * from student
where user_id = $1;