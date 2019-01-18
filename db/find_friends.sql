SELECT * from student
WHERE cohort = $1
AND student.user_id NOT IN (SELECT student.user_id FROM student
WHERE student.user_id = $2 )