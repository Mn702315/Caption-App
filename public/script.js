// Step 1: Upload Video
document.getElementById('process-video-button').onclick = function() {
    const videoFile = document.getElementById('video-upload').files[0]; // Assuming your input has id 'video-upload'
    const captionFileName = document.getElementById('caption-upload').files[0]; // Assuming your input has id 'caption-upload'
    
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('captionFile', captionFileName.name); // You may need to adjust this if you're sending the file directly

    fetch('http://localhost:5001/api/process-video', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log(data.message);
            // Create a link to the processed video
            const link = document.createElement('a');
            link.href = data.outputFile; // This should be the URL to the processed video
            link.textContent = 'Download Processed Video';
            link.target = '_blank'; // Opens the link in a new tab
            document.body.appendChild(link); // Add the link to the body or a specific container
        } else {
            console.error('Error processing video:', data.message);
        }
    })
    .catch(error => {
        console.error('Error processing video:', error);
    });
};
