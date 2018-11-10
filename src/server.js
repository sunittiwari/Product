var express = require('express'),
    app = express(),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser');

    var products = [
        {
          "productId": 1,
          "productName": "Leaf Rake",
          "productCode": "GDN-0011",
          "releaseDate": "March 19, 2016",
          "description": "Leaf rake with 48-inch wooden handle.",
          "price": 19.95,
          "starRating": 3.2,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
      },
      {
          "productId": 2,
          "productName": "Garden Cart",
          "productCode": "GDN-0023",
          "releaseDate": "March 18, 2016",
          "description": "15 gallon capacity rolling garden cart",
          "price": 32.99,
          "starRating": 4.2,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
      },
      {
          "productId": 5,
          "productName": "Hammer",
          "productCode": "TBX-0048",
          "releaseDate": "May 21, 2016",
          "description": "Curved claw steel hammer",
          "price": 8.9,
          "starRating": 4.8,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
      },
      {
          "productId": 8,
          "productName": "Saw",
          "productCode": "TBX-0022",
          "releaseDate": "May 15, 2016",
          "description": "15-inch steel blade hand saw",
          "price": 11.55,
          "starRating": 3.7,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
      },
      {
          "productId": 10,
          "productName": "Video Game Controller",
          "productCode": "GMG-0042",
          "releaseDate": "October 15, 2015",
          "description": "Standard two-button video game controller",
          "price": 35.95,
          "starRating": 4.6,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
      }
      ];

    //Aplying a middleware
    app.use(cors({
        origin:'http://localhost:4200'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extende:false}));
app.post('/authenticate',function(req,res){
    if(req.body.username =="admin"&&req.body.password =="admin"){
        var token = jwt.sign({username:req.body.username},'marlabs-secret-key',{
            'expiresIn':'1h'
        });
        res.send({
            token:token,
            isloggedin:true
        });
        
    }
    else{
        res.send({
            isloggedin:false,
            err:'Wrong Credentials!!'
        });
    }
});
app.use(function(req,res,next){
    var token = req.body.authorization||req.query.authorization||req.headers.authorization;
     if(token){
         jwt.verify(token,'marlabs-secret-key',function(err,decoded){
             if(!err){
                 req.decoded = decoded;
                 next();
             }else{
                 res.send({
                     isloggedin:false,
                     err:'Invalid request'
                 });
             }
         });
     }  else{
         res.send({
             isloggedin: false,
             err:'Invalid request'
         });
     } 

});
app.get('/getproducts',function(req, res){
    res.send(products);
});

app.post('/getdetails',function(req,res){
    console.log(products.find(o => o.productId == req.body.id));
   res.send(products.find(o => o.productId == req.body.id));
});

  app.listen(3000,function(){
      console.log('Serveer Started');
  });  