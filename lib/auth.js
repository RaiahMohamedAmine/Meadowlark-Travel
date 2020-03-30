var User =  require('../DB/models/user'),
    passport = require('passport'),
    FbStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser ((id,done)=>{
    User.findById(id, (err,user)=>{
        if(err|| !user) return done(err,null);
        done (null, user);
    });
});

module.exports=(app,options)=>{
    if(!options.successRedirect)
        options.successRedirect='/account'
    if(!options.failureRedirect)
        options.failureRedirect='/login'
    return {
        init :function (){           
            var env =app.get('env');
            var config = options.providers; 
            passport.use(new FbStrategy({
                clientID : config.facebook[env].appId,
                clientSecret : config.facebook[env].appSecret,
                callbackURL : '/auth/facebook/callback'  
            }, (accessToken, refreshToken, profile,done)=>{
                var authId = 'facebook:'+profile.id;
                User.findOne ({authId}, (err,user)=>{
                    if (err) return done (err,null);
                    if (user) return done (null, user);
                    user = new User({
                        authId,
                        name : profile.displayName ,
                        created : new Date (),
                        role : 'customer'
                    }); 

                    user.save ((err)=>{ 
                        if (err) return done (err,null);
                        done (null, user);
                    });
                });
            }));
            app.use (passport.initialize ());
            app.use(passport.session ());
        },
        registerRoutes :function(){
            app.get ('/auth/facebook',
                passport.authenticate('facebook')
            );
            app.get ('/auth/facebook/callback',passport.authenticate ('facebook',{ failureRedirect :'/login'}),(req,res)=>{
                res.redirect(303,'/account')
            }
        )}
    };
};