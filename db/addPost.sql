insert into posts (type, tag, posttime, content, userid, img)
values($1, $2, current_timestamp, $3, $4, $5);