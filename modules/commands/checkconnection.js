module.exports.config = {
    name: "checkconnect",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "CatalizCS",
    description: "Kiểm tra hiện trạng kết nối của bot",
    commandCategory: "system",
    usages: "checkconnect url",
    cooldowns: 5,
    dependencies: ["child_process"],
    info: [
        {
            key: 'url',
            prompt: 'Địa chỉ bạn cần kiểm tra kết nối',
            type: 'url',
            example: 'google.com'
        },
    ]
};

const exec = require('child_process').exec;

function runCommand(command) {
    return new Promise((resolve, reject) => {
        dir = exec(command, function(err, stdout, stderr) {
            if (err) return reject(err);
            resolve(stdout);
        });
    })
}

module.exports.onLoad = async function () {
    const logger = require(process.cwd() + "/utils/log");
    const pingStatus = await runCommand("ping facebook.com -c 1");
    logger.loader(pingStatus);
}

module.exports.run = async function({ api, event, args }) {
    try {
        const pingStatus = await runCommand(`ping ${args[0]} -c 1`);
        return api.sendMessage(`${pingStatus}`,event.threadID, event.messageID);
    }
    catch(e) {
        return api.sendMessage("URL không hợp lệ! " + e, event.threadID, event.messageID);
    }
}