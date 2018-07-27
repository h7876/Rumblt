select * from posts 
where id in (select postid from likes where userid = $1);