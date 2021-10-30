const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let input = dropArea.querySelector('input');

let file;

function inputClick()
{
  input.click();
}

// when browse
input.addEventListener('change', function () {
  file = this.files[0];
  dropArea.classList.add('active');
  $("#remove-btn").show();
  displayFile();
});

// when file is inside drag area
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload';
  // console.log('File is inside the drag area');
});

// when file leave the drag area
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  // console.log('File left the drag area');
  dragText.textContent = 'Drag & Drop';
});

// when file is dropped
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  //console.log('File is dropped in drag area');

  $("#remove-btn").show();

  file = event.dataTransfer.files[0]; // grab single file even of user selects multiple files
  // console.log(file);
  displayFile();
});


function displayFile() {
  let fileType = file.type;
  // console.log(fileType);

  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

  if (validExtensions.includes(fileType)) {
    // console.log('This is an image file');
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      // console.log(fileURL);
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag;
      //fileURL is the base64 format of the image
      //sending fileURL as ajax request
      var img=fileURL;
      $.ajax({
        type: "POST",
        url: "#",
        data: {id:img},
        success: function() {
          //image uploaded sucessfully
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
      });
    };
    fileReader.readAsDataURL(file);

    //displaying loading spinner over image
    $('#drag-area').oLoader({
      backgroundColor: '#000000ef',
      fadeInTime: 500,
      fadeLevel: 0.8,
      image: 'assets/img/preloader.gif',
      style: 2,
      imagePadding: 5,
      imageBgColor: 'transparent'
    });

  } else {
    alert('This is not an Image File');
    dropArea.classList.remove('active');
  }
}
