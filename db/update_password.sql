update student
set password = $1
where user_id = $2;

select * from student
where user_id = $2;