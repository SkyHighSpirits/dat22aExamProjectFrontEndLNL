// Add event listener for the "Upload" button
document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton')
    if (uploadButton) {
        uploadButton.addEventListener('click', uploadPost);
    }
});
const HTMLPostImage = 'http://localhost:8080/createPost'

function uploadPost() {
    const inputDescription = document.getElementById('description').value
    const inputTitel = document.getElementById('titleinput').value
    const input = document.getElementById('imageInput');
    const file = input.files;

    if (file.length > 0) {
        const formData = new FormData();
        //håndtere titel og description tekst:
        formdata.append('title', inputTitel)
        formdata.append('description', inputDescription)
        //håndtere billeder :
        for (let i = 0; i < files.length; i++) {
            formData.append('image', file[i])
        }

        fetch('http://localhost:8080/postImage', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                document.getElementById('response').innerText = data;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('response').innerText = 'Error uploading image';
            });
    } else {
        document.getElementById('response').innerText = 'Please select an image to upload';
    }
}