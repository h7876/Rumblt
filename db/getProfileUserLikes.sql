select * from posts a left join users b on a.userid = b.userid 
where id in (select postid from likes where userid = $1)