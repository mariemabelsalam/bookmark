var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("websiteUrl");
var searchInput = document.getElementById("searchItem");
var submitInput = document.getElementById("Submitbtn");
var upadteInput = document.getElementById("updatebtn");

// console.log(siteNameInput , siteUrlInput)

var allBookmark = []
if (localStorage.getItem('bookmark') !== null) {
    allBookmark = JSON.parse(localStorage.getItem('bookmark'))
    displayData();
}
function addBookmark() {
    if (validation(siteNameInput) && validation(siteUrlInput)) {
        var bookmark = {
            bookmarkName: siteNameInput.value,
            websitURL: siteUrlInput.value,
        }
        allBookmark.push(bookmark);
        localStorage.setItem('bookmark', JSON.stringify(allBookmark))
        displayData();
        clear();
    }
    else {
        Swal.fire({
            title: 'Site Name or Url is not valid',
            html: `
              <p>Please follow the rules below:</p>
              <ul style="text-align: left;">
                <li>Site name must contain at least 3 characters</li>
                <li>Site URL must be a valid one</li>
              </ul>
            `,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal-wide'
            }
        });
    };
}

function table(i) {
    return ` <tr>
                    <td>${i}</td>
                    <td>${allBookmark[i].bookmarkName}</td>
                    <td>
                        <button class="btn text-white bg-success bg-opacity-75">
                            <a href="${allBookmark[i].websitURL}" target="_blank" class="text-white text-decoration-none"><i class="fa-solid fa-eye"></i>
                            <span>Visit</span> </a>
                        </button>
                    </td>
                    <td>
                        <button class="btn text-white bg-danger" onclick="deleteItem(${i})">
                            <i class="fa-solid fa-trash-can"></i>
                            <span>Delete</span>
                        </button>
                    </td>
                     <td>
                        <button class="btn text-white bg-warning" onclick="setupdate(${i})">
                           <i class="fa-solid fa-pen-to-square"></i>
                            <span>update</span>
                        </button>
                    </td>
                  </tr>`
}
function clear() {
    siteNameInput.value = null;
    siteUrlInput.value = null;

    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')
}

function displayData() {
    var item = " "
    for (var i = 0; i < allBookmark.length; i++) {
        item += table(i)
    }
    document.getElementById("items").innerHTML = item
}

function deleteItem(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-2",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            allBookmark.splice(index, 1);
            localStorage.setItem('bookmark', JSON.stringify(allBookmark));
            displayData();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

}


function validation(element) {
    var text = element.value;
    var regex = {
        bookmarkName: /^.{3,}$/,
        websiteUrl: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/
    }
    if (regex[element.id].test(text)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}

function search() {
    var key = searchInput.value;
    var item = " "
    for (var i = 0; i < allBookmark.length; i++) {
        if (allBookmark[i].bookmarkName.toLowerCase().includes(key.toLowerCase())) {
            item += table(i)
        }
    }
    document.getElementById("items").innerHTML = item
}

var index;
function setupdate(i) {
    index = i;
    siteNameInput.value = allBookmark[i].bookmarkName;
    siteUrlInput.value = allBookmark[i].websitURL;
    submitInput.classList.add('d-none');
    upadteInput.classList.remove('d-none');
}

function update() {
    var bookmark = {
        bookmarkName: siteNameInput.value,
        websitURL: siteUrlInput.value,
    }
    allBookmark.splice(index , 1 , bookmark)
    localStorage.setItem("bookmark" , JSON.stringify(allBookmark))
    displayData()
    submitInput.classList.remove('d-none');
    upadteInput.classList.add('d-none');
}