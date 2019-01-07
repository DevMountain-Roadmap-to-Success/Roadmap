update date_table
set activity = $2
where id = $1;


select activity, id from date_table
where id = $1;
