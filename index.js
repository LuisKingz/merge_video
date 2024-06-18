// npm i fleunt-ffmpeg @ffmpeg-installer/ffmpeg @ffprobe-installer/ffprobe --save
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = 'C:\\Users\\Gerardo\\Downloads';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfprobePath(ffprobePath);


async function main() {

    const input1 = `${path}\\conflicts_3_0s.mp4`;
    const input2 = `${path}\\conflicts_2_0s.mp4`;
    // Input files
    const buffer1 = fs.readFileSync(input1);
    const buffer2 = fs.readFileSync(input2);

    // Output file
    const output = 'output.mp4';

    // Combine videos
    await new Promise((resolve, reject) => {
        ffmpeg()
            .input(buffer1)
            .input(buffer2)
            .on('end', resolve)
            .on('error', reject)
            .mergeToFile(output);
    });

    console.log('Videos merged successfully.');
}

main();