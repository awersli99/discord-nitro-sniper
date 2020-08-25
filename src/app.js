const Discord = require('discord.js')
const config = require('./config.json')
const request = require('request')
const client = new Discord.Client()

var urls = ['discord.gift/', 'discordapp.com/gifts/', 'discord.com/gifts/']

function redeemcode(code) {
    var options = {
        'method': 'POST',
        'url': 'https://ptb.discordapp.com/api/v6/entitlements/gift-codes/' + code + '/redeem',
        'headers': {
            'Authorization': config.token,
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body + '\n');
    });
}

client.on('ready', () => {
    console.log("Sniping as " + client.user.tag)
})

client.on('message', message => {

    var contentsplit = message.content.split(' ')
    for (var x in contentsplit) {
        for (var url in urls) {
            if (contentsplit[x].replace('https://', '').replace('http://', '').startsWith(urls[url])) {
                var code = contentsplit[x].replace(urls[url], '')
                console.log('\nServer: ' + message.guild.name + '\n' + 'Author: ' + message.author.username + '\n' + 'Channel: ' + message.channel.name + '\n' + 'Gift code: ' + code)
                redeemcode(code)
            }
        }
    }
})

client.login(config.token)
