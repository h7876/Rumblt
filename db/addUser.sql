insert into users(userid, name, username, blogtitle, userimg) values($1, $2, $3, $4, $5)
returning *;