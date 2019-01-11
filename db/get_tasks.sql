select * from tasks
where user_id = $1
and date <= current_date
order by date asc;



