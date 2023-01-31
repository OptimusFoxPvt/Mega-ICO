const { TwitterApi } = require("twitter-api-v2");
const config = require("../config/configBasic");
const needle = require("needle");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const web3 = require("web3");
const Bounty = require("../models/Bounty");
const cloudinary = require("cloudinary");

const endpointURL = "https://api.twitter.com/2/tweets?ids=";

const getTweet = async (link, req, res) => {
  try {
    const tweet_id = link.substring(link.lastIndexOf("/") + 1);

    const twitterConsumerKey = config.twitter.consumer_key;
    const twitterConsumerSecret = config.twitter.consumer_secret;

    //the consumer key 'RFC 1738 encoded'
    const rfcKey = encodeURI(twitterConsumerKey);

    //the consumer secret 'RFC 1738 encoded'
    const rfcSecret = encodeURI(twitterConsumerSecret);

    //make the bearer token credential string -
    //the rfc encoded key : the rfc encoded secret
    const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;
    // console.log("bearerTokenCredentials", bearerTokenCredentials);
    //encode the credentials to base 64
    const base64BearerTokenCredentials = Buffer.from(
      bearerTokenCredentials
    ).toString("base64");
    // console.log("base64BearerTokenCredentials", base64BearerTokenCredentials);
    //create the options object for node-fetch
    const options = {
      headers: {
        accept: "gzip",

        //use your authorization string
        Authorization: "Basic " + base64BearerTokenCredentials,

        "content-type": "application/x-www-form-urlencoded",
      },
      //it's a POST
      method: "POST",
      body: "grant_type=client_credentials",
    };

    const response = await fetch(
      "https://api.twitter.com/oauth2/token",
      options
    );

    let bearerToken = await response.json();
    // bearerToken = JSON.stringify(bearerToken);
    console.log("Bearer Token ", bearerToken.access_token);
    const params = {
      ids: tweet_id, // Edit Tweet IDs to look up
      "tweet.fields": "lang,author_id", // Edit optional query parameters here
      "user.fields": "created_at", // Edit optional query parameters here
    };
    const response_twitter = await needle("get", endpointURL, params, {
      headers: {
        "User-Agent": "v2TweetLookupJS",
        authorization: `Bearer ${bearerToken.access_token}`,
      },
    });
    if (response_twitter.body) {
      const wallet_address = response_twitter.body.data[0].text
        .substring(28, 71)
        .trim();
      const response_address = web3.utils.isAddress(`${wallet_address}`);
      console.log(response_address);
      let pic_url;
      console.log("req.files.file", req.files.file);

      if (response_address) {
        const bonus = await Bounty.find({ wallet_address: wallet_address });

        if (bonus.length === 0) {
          await cloudinary.config({
            cloud_name: config.cloudnary.cloud_name,
            api_key: config.cloudnary.api_key,
            api_secret: config.cloudnary.api_secret,
          });
          await cloudinary.uploader.upload(
            req.files.file.tempFilePath,
            function (result, err) {
              if (err) {
                return res.status(400).send({
                  msg: err,
                  success: false,
                });
              }
              pic_url = [result.secure_url];
            }
          );
          const bounty = {
            user: req.user.id,
            bounty_link: link,
            wallet_address: wallet_address,
            bounty_ss: pic_url,
          };
          const save_bounty = new Bounty(bounty);
          console.log("save_bounty", save_bounty);

          const response_bounty = await save_bounty.save();
          console.log(response_bounty);
          if (response_bounty) {
            return true;
          }
          return res.status(400).send({
            msg: "Didn't save the record",
            success: false,
          });
        }
        return res.status(400).send({
          msg: "Already claim the reward",
          success: false,
        });
      }
      return res.status(400).send({
        msg: "wallet address is not valid",
        success: false,
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send({
      msg: error,
      success: false,
    });
  }
};

module.exports = { getTweet };
