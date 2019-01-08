update date_table
set activity = $2
where id = $1;

update date_table
set priority = $3
where id = $1;


select activity, id, priority from date_table
where id = $1;
