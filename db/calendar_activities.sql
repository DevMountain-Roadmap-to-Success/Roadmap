select activity, id from date_table
where date = $1
and time = $2
and user_id = $3; 
