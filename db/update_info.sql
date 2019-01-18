update student
set 
full_name = $1,
cohort = $3, 
image = $2
where user_id = $4;

select * from student
where user_id = $4;