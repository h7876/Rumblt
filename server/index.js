const express = require('express')
massive = require('massive')
require('dotenv').config()
bodyParser = require('body-parser')
const app = express();

const {
    CONNECTION_STR,
    SERVER_PORT
} = process.env;

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json()); 

massive(CONNECTION_STR).then( (db) => {
    console.log('db connected');
    app.set('db', db);  
})

//FOR Dashboard.js AND UserInfo.js AND Profile.js//
app.get('/api/users/:userid', (req, res) => {
    const userid = req.params.userid;
    const dbInstance = req.app.get('db');
    dbInstance.getUser([userid])
    .then(user => {res.status(200).send(user);
   }).catch(err => {
    console.log(err);
    res.status(500).send(err)
});
});

//FOR Dashboard.js//
app.get('/api/users/', (req, res) => {
    const dbInstance = req.app.get('db');
    dbInstance.getallusers().then(users => {
        res.status(200).send(users);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err)
    });
})

//FOR RandomPost.js//
app.get('/api/randpost/', (req, res)=>{
    const dbInstance = req.app.get('db');

    dbInstance.getPost().then(posts=>{
        var num = Math.floor(Math.random()*posts.length)
        res.status(200).send(posts[num])
    }).catch(err=>{
        console.log(err)
    })

})

//go on dashboard
app.get('/api/posts/' , (req, res)=> {
const dbInstance = req.app.get('db');
dbInstance.getAllPosts().then(posts=> {
    res.status(200).send(posts)
}).catch(err=> {
    res.status(500).send(err)
})
})

//users profile
app.get('/api/posts/:userid', (req, res)=> {
    const userid = req.params.userid;
    const dbInstance = req.app.get('db');
    dbInstance.getSingleUserPosts([userid]).then(posts => {
        res.status(200).send(posts)
    }).catch(err=> {
        res.status(500).send(err)
    })
})

//FOR Profile.js//
// app.get(`/api/get_blogs_followed_info/:userid`, (req, res) => {
//   const userid = req.params.userid;
//   const dbInstance = req.app.get('db');
//   dbInstance.getBlogsFollowedInfo(userid).then( followingInfo => {
//     res.status(200).send(followingInfo)
//   }).catch( err => {
//     res.status(500).send(err);
//   })
// })

//FOR Profile.js//
app.get(`/api/get_like_ids/:userid`, (req, res) => {
  const userid = req.params.userid;
  const dbInstance = req.app.get('db');
  dbInstance.getLikeIds(userid).then( likeIds => {
    res.status(200).send(likeIds);
  }).catch( err => {
    res.status(500).send(err);
  })
})

//FOR MainHeader.js//
app.get('/api/likeCount/:userid', (req, res)=>{
    const userid = req.params.userid;
    const dbInstance = req.app.get('db');
    dbInstance.likesCount([userid]).then(count => {
        res.status(200).send(count)
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
})

//Get notes count for post (TODO: update to include comments/reblogs)
app.get('/api/getLikeCount/:postId', (req, res)=>{
    const postid = req.params.postid;
    const dbInstance = req.app.get('db');
    dbInstance.likesCount([postid]).then(count => {
        res.status(200).send(count)
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
})

//FOR DashFeed.js AND Profile.js//
app.post('/api/likes/', (req, res)=> {
    let{userid, postid} = req.body;
    req.app.get('db').addLikes([userid, postid]).then(ok => {
        res.status(200).send("ok")}).catch(err=> {
            res.status(500).send(err)
        })
})

//Kind of matches an endpoint in DashFeed.js, but not completely//
app.delete('/api/likes/:userid/:postid', (req, res)=> {
    let{userid, postid} = req.params;
    req.app.get('db').deleteLike([userid, postid]).then(ok => {
        res.status(200).send("ok")}).catch(err=> {
            res.status(500).send(err)
        })
})

//FOR MainHeader.js//
app.get('/api/postCount/:userid', (req, res)=>{
    const userid = req.params.userid;
    const dbInstance = req.app.get('db');
    dbInstance.postCount([userid]).then(count => {
        res.status(200).send(count)
    }).catch(err=>{
             console.log(err);
        res.status(500).send(err)
    })
})

//FOR ImgPost.js AND TextPost.js//
app.post('/api/posts/new', (req, res) => {
    let {imgurl, textInput, type, tagInput, uid} = req.body;
    req.app.get('db').addPost([type, tagInput, textInput, uid, imgurl]).then(ok => {
        res.status(200).send('ok')
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})

//FOR DashFeed.js//
app.get(`/api/userLikes/:userid`, (req, res) => {
    let {userid} = req.params;
    req.app.get('db').getUserLikes([userid]).then(likedPosts => {
        res.status(200).send(likedPosts)
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})

//FOR Profile.js//
app.get(`/api/get_profile_user_likes/:userid`, (req, res) => {
  let {userid} = req.params;
  req.app.get('db').getProfileUserLikes([userid]).then(likedPosts => {
      res.status(200).send(likedPosts)
  }).catch(err=> {
      console.log(err);
      res.status(500).send(err)
  })
})

app.post('/api/newuser/', (req, res)=> {
  let{userid, name, username, blogtitle, userimg} = req.body;
  req.app.get('db').addUser([userid, name, username, blogtitle, userimg]).then(ok=> {
      res.sendStatus(200);
  }).catch(err=> {
      console.log(err);
      res.status(500).send(err)
  })
})

app.get(`/api/followerCount/:followeduserid`, (req, res) => {
    let {followeduserid} = req.params;
    req.app.get('db').followersCount([followeduserid]).then(followerCount => {
        res.status(200).send(followerCount);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})

app.get(`/api/followingCount/:userid`, (req, res) => {
    let {userid} = req.params;
    req.app.get('db').getFollowingCount([userid]).then(followingCount => {
        res.status(200).send(followingCount);
    }).catch(err=> {
        console.log(err);
        res.status(500).send(err)
    })
})

app.get(`/api/followers/:userid`, (req, res) => {
    let {userid} = req.params;
    req.app.get('db').getUserFollowers([userid]).then(followers => {
        res.status(200).send(followers)
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.post(`/api/newFollower/:userid/:followeduserid`, (req, res) => {
    let {userid, followeduserid} = req.params;
    req.app.get('db').addFollowing([userid, followeduserid]).then(ok => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    })
}) 

app.delete(`/api/unfollow/:userid/:followeduserid`, (req, res)=> {
    let {userid, followeduserid} = req.params;
    req.app.get('db').unfollow([userid, followeduserid]).then(ok=> {
        res.sendStatus(200);
    }).catch((err)=> {
        console.log(err);
        res.status(500).send(err)
    })
 })

 app.get(`/api/user/following/:userid`, (req, res) => {
     let {userid} = req.params;
     req.app.get('db').getfollowing([userid]).then(following => {
         res.status(200).send(following);
     }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    })
 })


app.listen(SERVER_PORT, () => {console.log(`listening on ${SERVER_PORT}`)});
