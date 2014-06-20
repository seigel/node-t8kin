var Hapi = require('hapi');
var redis = require("redis");
var async = require('async');
var url = require('url');

var redisClient;
if (process.env.REDISCLOUD_URL != undefined) {
    var redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisClient = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
    redisClient.auth(redisURL.auth.split(":")[1]);
} else {
    redisClient = redis.createClient();
}
redisClient.on("error", function (err) {
    console.log("Redis Error ", err);
});

var config = {
    validation: {
        stripUnknown: true
    },
    views: {
        path: './templates',
        engines: {
            html: require('handlebars')
        }
    }
};
var server = new Hapi.Server('0.0.0.0', parseInt(process.env.PORT || 9090), config);
module.exports.server = server;


server.route({
    method: 'GET',
    path: '/',
    config: {
        handler: function (request, reply) {
            reply.view('index.html');
        }
    }
});

server.route({
    path: "/css/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: "./templates/css",
            listing: false,
            index: false
        }
    }
});

server.route({
    path: "/js/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: "./templates/js",
            listing: false,
            index: false
        }
    }
});

server.route({
    path: "/i/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: "./templates/i",
            listing: false,
            index: false
        }
    }
});


server.start(function () {
    console.log("API server started on port: ", server.info.port);
});


