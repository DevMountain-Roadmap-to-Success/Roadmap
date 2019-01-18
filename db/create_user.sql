insert into student (email, password)
values($1, $2)
returning *