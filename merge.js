// npm i fleunt-ffmpeg @ffmpeg-installer/ffmpeg @ffprobe-installer/ffprobe --save
// npm i tmp
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const tmp = require('tmp');
const path = 'C:\\Users\\Gerardo\\Downloads';


const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);

const output = 'output.mp4';


// ALMACENARLOS EN UN ARREGLO DE BUFFERS
const videos = [
    fs.readFileSync(`${path}\\conflicts_3_0s.mp4`),
    fs.readFileSync(`${path}\\conflicts_2_0s.mp4`),
    fs.readFileSync(`${path}\\conflicts_3_0s.mp4`),
    fs.readFileSync(`${path}\\conflicts_2_0s.mp4`),
]

const mergeVideos = async videoBuffers => {
    const tempVideo = [];
    try {
        await videoBuffers.forEach(buffer => {
            let tmpFile = tmp.fileSync();
            console.log(buffer.length);
            fs.writeFileSync(tmpFile.name, buffer);
            tempVideo.push(tmpFile.name);
        });

        const inputs = tempVideo.reduce((result, inputItem) => result.addInput(inputItem), ffmpeg());

        return await new Promise((resolve, reject) => {
            inputs.on('start', () => {
                console.log('Videos merged start.');
            }).on('progress', progress => {
                console.log(JSON.stringify(progress));
            }).on('end', () => {
                resolve();
                tempVideo.forEach(video => {
                    fs.unlinkSync(video);
                });
            }).on('error', () => {
                reject();
                console.log("");
                tempVideo.forEach(video => {
                    fs.unlinkSync(video);
                });
            }).mergeToFile(output);
        });

    } catch (e) {
        console.log(e);
    }
}

mergeVideos(videos)
