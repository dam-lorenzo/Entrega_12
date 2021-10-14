class readedBook {
    constructor() {
        this.title          = prompt("Ingrese el titulo del libro:");
        this.genres         = prompt("Ingrese los generos del libro (solo separado por espacios):").split(' ');
        this.author         = prompt("Ingrese el nombre del autor:");
        this.description    = prompt("Ingrese la descripcion:");
        this.resume         = prompt('Ingrese una reseña del libro:').split();
        this.year           = parseInt(prompt("Ingrese el año de publicacion:"));
        // this.pages          = parseInt(prompt("Ingrese la cantidad de paginas del libro (solo el numero):"));
        this.rating         = parseFloat(prompt("Ingrese cuantas estrellas del 1 al 5 le asigna (solo el numero):"));
    }
    
    addGenre(genres) {
        for (const genre of genres) {
            if (this.genres.includes(genre) == false) {
                this.genres.push(genre)
            }
        }
    }

    addRating(rating) {
        rating = parseFloat(rating)
        this.rating = (this.rating + rating)/2
    }

    addResume(resumes) {
        for (const resume of resumes) {
            this.resume.push(resume)
        }
    }

    inBooks(books){
        for (const book of books){
            if ((book.title == this.title) && (book.author == this.author) && (book.year == this.year)){
                this.addGenre(book.genres)
                this.addRating(book.rating)
                this.addResume(book.resume)
                return book
            }
        }
        return false
    }
}

function createNewContainer(htmlbook) {
    let newContainer = document.createElement('div')
    newContainer.classList.add('container')
    let newRow = document.createElement('div')
    newRow.classList.add('row')
    newRow.appendChild(htmlbook)
    newContainer.appendChild(newRow)
    console.log('new container:')
    console.log(newContainer)
    return newContainer
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function appendBook(book) {
    let htmlbook = document.createElement('div')
    htmlbook.classList.add('col-sm-4')
    htmlbook.innerHTML = ` <div class="panel panel-primary">
                                <div class="panel-heading">${book.title}</div>
                                <div class="panel-body"><img src="img/leather-book-preview.png" class="img-responsive" style="width:100%" alt="Image"></div>
                                <div class="panel-footer">${book.description}</div>
                            </div>`
    //console.log(container)
    let rows = document.getElementsByClassName('row')
    let notAddedContainer = true
    let lastRow
    for (const row of rows) {
        if (row.getElementsByClassName('col-sm-4').length < 3){
            row.appendChild(htmlbook)
            notAddedContainer = false
        }
        lastRow = row
    }
    let container = createNewContainer(htmlbook)
    if (lastRow) {
        if (notAddedContainer) {
            insertAfter(lastRow.parentNode, container)
            container.insertAdjacentHTML('beforebegin', '<br>')
        }
    }
    else{
        const navBar = document.getElementById('navBar')
        navBar.insertAdjacentHTML('afterend', container)
        container.insertAdjacentHTML('beforebegin', '<br>')
    }
}

function addBook() {
    // const newBook = requestBookData()
    const newBook = new readedBook();
    let books_json = localStorage.getItem('books')
    console.log(books_json)
    let books = JSON.parse(books_json)
    if (books_json){
        let toDelete = newBook.inBooks(books)
        if (toDelete){
            console.log('El libro ya esta en la pagina')
            books = books.filter(item => item !== toDelete)
            books.push(newBook)
        }
        else{
            appendBook(newBook)
            books.push(newBook)
        }
    }
    else{
        appendBook(newBook)
        books = [newBook]
    }
    books_json = JSON.stringify(books)
    localStorage.setItem('books', books_json);
}

function commingSoon() {
    alert('This feature is comming soon')
}

function loadBooks() {
    const books_json = localStorage.getItem('books')
    books = JSON.parse(books_json)
    if (books){
       for (book of books){
            appendBook(book)
        }
    }
    console.log('Books loaded')
}

$( document ).ready(function() {
    console.log('El DOM esta listo');
    $('#addButton').click( function(){
            addBook();
        }
    );
    $('#login').click( function() {
            commingSoon();
        }
    );
    
    $('#subscribe').click( function() {
            commingSoon();
        }
    );
});

