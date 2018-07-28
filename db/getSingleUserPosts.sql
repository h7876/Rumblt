select * from posts join users on posts.userid = users.userid where posts.userid = $1  order by posttime desc
