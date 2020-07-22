const Discord = require('discord.js')
const config = require('./config.json')
const request = require('request')
const client = new Discord.Client()

var contentsplit
var code
var x

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

    contentsplit = message.content.split(' ')
    for (x in contentsplit) {
        if (contentsplit[x].startsWith('https://discord.gift/')) {
            code = contentsplit[x].replace('https://discord.gift/', '')
            console.log('\nServer: ' + message.guild.name + '\n' + 'Author: ' + message.author.username + '\n' + 'Channel: ' + message.channel.name + '\n' + 'Gift code: ' + code)
            redeemcode(code)
        }
        else if (contentsplit[x].startsWith('discord.gift/')) {
            code = contentsplit[x].replace('discord.gift/', '')
            console.log('\nServer: ' + message.guild.name + '\n' + 'Author: ' + message.author.username + '\n' + 'Channel: ' + message.channel.name + '\n' + 'Gift code: ' + code)
            redeemcode(code)
        }
    }
})

client.login(config.token)
