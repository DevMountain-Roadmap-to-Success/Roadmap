insert into date_table(user_id, date, time, activity, priority)
values($1, $2, $3, $4, $5);

select * from date_table
where user_id = $1
and date = $2
and time = $3;