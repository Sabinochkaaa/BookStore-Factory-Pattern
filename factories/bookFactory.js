// Паттерн Factory для создания разных типов книг

class PhysicalBook {
    constructor(id, title, author, genre, price, oldPrice, rating, pages, year, badge, desc, bg, cover) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.oldPrice = oldPrice || null;
        this.rating = rating;
        this.pages = pages;
        this.year = year;
        this.badge = badge || null;
        this.desc = desc;
        this.bg = bg;
        this.cover = cover;
        this.type = 'physical';
        this.typeName = '📖 Физическая книга';
    }
}

class EBook {
    constructor(id, title, author, genre, price, oldPrice, rating, pages, year, badge, desc, bg, cover) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = Math.floor(price * 0.7); // Электронная дешевле на 30%
        this.oldPrice = oldPrice ? Math.floor(oldPrice * 0.7) : null;
        this.rating = rating;
        this.pages = pages;
        this.year = year;
        this.badge = badge || null;
        this.desc = desc + " (электронная версия, PDF/EPUB)";
        this.bg = bg;
        this.cover = cover;
        this.type = 'ebook';
        this.typeName = '💻 Электронная книга';
    }
}

class AudioBook {
    constructor(id, title, author, genre, price, oldPrice, rating, pages, year, badge, desc, bg, cover) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = Math.floor(price * 0.5); // Аудиокнига дешевле на 50%
        this.oldPrice = oldPrice ? Math.floor(oldPrice * 0.5) : null;
        this.rating = rating;
        this.pages = pages;
        this.year = year;
        this.badge = badge || null;
        this.desc = desc + " (аудиокнига, MP3)";
        this.bg = bg;
        this.cover = cover;
        this.type = 'audiobook';
        this.typeName = '🎧 Аудиокнига';
    }
}

class BookFactory {
    static createBook(bookData, type = 'physical') {
        switch(type) {
            case 'ebook':
                return new EBook(
                    bookData.id, bookData.title, bookData.author,
                    bookData.genre, bookData.price, bookData.oldPrice,
                    bookData.rating, bookData.pages, bookData.year,
                    bookData.badge, bookData.desc, bookData.bg, bookData.cover
                );
            case 'audiobook':
                return new AudioBook(
                    bookData.id, bookData.title, bookData.author,
                    bookData.genre, bookData.price, bookData.oldPrice,
                    bookData.rating, bookData.pages, bookData.year,
                    bookData.badge, bookData.desc, bookData.bg, bookData.cover
                );
            default:
                return new PhysicalBook(
                    bookData.id, bookData.title, bookData.author,
                    bookData.genre, bookData.price, bookData.oldPrice,
                    bookData.rating, bookData.pages, bookData.year,
                    bookData.badge, bookData.desc, bookData.bg, bookData.cover
                );
        }
    }
}

module.exports = BookFactory;