const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

exports.processVideo = (req, res) => {
    const videoPath = req.file.path; // Path to the uploaded video
    const captionPath = req.body.captionFile; // Caption file
    const outputFilePath = path.join(__dirname, '../uploads', `output-${path.basename(videoPath)}`);

    console.log(`Processing video at: ${videoPath}`);
    console.log(`Processing caption at: ${captionPath}`);

    // Use ffmpeg to process the video
    ffmpeg(videoPath)
        .outputOptions([`-vf subtitles=${captionPath}`]) // Add the captions as subtitles
        .save(outputFilePath)
        .on('end', () => {
            console.log(`Video processed successfully. Output file: ${outputFilePath}`);
            res.json({ 
                success: true, 
                message: 'Video processed successfully!', 
                outputFile: `/uploads/${path.basename(outputFilePath)}` // Relative path to the output file
            });
        })
        .on('error', (error) => {
            console.error('Error processing video:', error);
            res.status(500).json({ success: false, message: 'Error processing video.' });
        });
};
