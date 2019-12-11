var express = require('express');
var router = express.Router();
require("dotenv").config();

/* GET tables listing. */
router.get('/getTables', function(req, res, next) {
	connection.query('show tables', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET catalogue. */
router.get('/getProCatalogue', function(req, res, next) {
	connection.query('select * from XXIBM_PRODUCT_CATALOGUE', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET Product Details */
router.get('/getProDetails', function(req, res, next) {
	var query = require('url').parse(req.url,true).query;
	var srchStr = query.srch;
	srchStr.replace("%20", " ");
	connection.query('select psku.*, pp.*, pstyle.CATALOGUE_CATEGORY as STYLE_CATALOGUE_CAT, pstyle.BRAND '+
			         'from XXIBM_PRODUCT_SKU psku '+
			         'left join XXIBM_PRODUCT_PRICING pp '+
			         'on psku.ITEM_NUMBER = pp.ITEM_NUMBER '+
			         'left join XXIBM_PRODUCT_STYLE pstyle '+
			         'on psku.STYLE_ITEM = pstyle.ITEM_NUMBER '+
			         'where (psku.DESCRIPTION like "%'+srchStr+'%" or psku.LONG_DESCRIPTION like "%'+srchStr+'%") '
			         , function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "results": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "results": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET Product Sku. */
router.get('/getProSku', function(req, res, next) {
	connection.query('select * from XXIBM_PRODUCT_SKU', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

/* GET Product Style. */
router.get('/getProStyle', function(req, res, next) {
	connection.query('select * from XXIBM_PRODUCT_STYLE', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});
module.exports = router;
