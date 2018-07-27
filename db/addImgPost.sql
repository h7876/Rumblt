insert into table posts (userid, type, tag, posttime, content, img)
values($1, $2, $3, current_timestamp, $4, $5);