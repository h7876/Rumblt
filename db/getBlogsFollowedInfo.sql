select * from users 
where userid != $1 
and userid in (select followeduserid from following where userid = $1);