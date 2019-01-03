update date_table
set activity = $4
where user_id = $1
and date = $2
and time = $3;

select * from date_table
where user_id = $1
and activity = $4;