create table student (
user_id serial primary key,
first_name text,
last_name text,
email text,
password text,
unique(user_id)
);

create table tasks (
task_id serial primary key,
user_id integer references student(user_id),
task_name text,
task_description text,
task_type text,
unique(task_id)
);

create table date_table (
date_id serial primary key,
numeric_format text,
day_name text,
calendar_day integer,
month_name text,
calendar_month integer,
calendar_year integer
);

create table hour_table (
hour_id serial primary key,
hour integer
);

create table minute_table (
minute_id serial primary key,
minute integer
);

create table task_connection (
id serial primary key,
user_id integer references student(user_id),
task_id integer references tasks(task_id),
date_id integer references date_table(date_id),
hour_id integer references hour_table(hour_id),
minute_id integer references minute_table(minute_id)
);