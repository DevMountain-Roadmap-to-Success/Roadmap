insert into date_table(user_id, date, time, activity)
values($1, $2, $3, $4);

select * from date_table
where user_id = $1
and activity = $4;