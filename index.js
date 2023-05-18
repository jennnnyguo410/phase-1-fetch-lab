function fetchBooks() {
  fetch("https://anapioficeandfire.com/api/books")
    .then((resp) => resp.json())
    .then((books) => {
      console.log("Deatils", books)

      //遍历每本书的角色数量
      //计数器+当前书里角色的数量超过1031 说明第1031个角色在当前书
      //锁定当前书籍
      //1030 - 计数器 为1031角色在当前书里的index
      //返回所属书，角色
      let characterCount = 0;
      let targetBook;

      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const characters = book.characters;

        if (characterCount + characters.length >= 1031) {
          targetBook = book;
          break;
        }

        characterCount += characters.length;
      }

      if (targetBook) {
        const targetCharacterIndex = 1030 - characterCount; // 第 1031 个角色在当前书籍中的索引
        const targetCharacterUrl = targetBook.characters[targetCharacterIndex];

        fetch(targetCharacterUrl)
          .then((resp) => resp.json())
          .then((character) => {
            console.log("所属书籍:", targetBook);
            console.log("第 1031 个角色:", character);
          });
      }

      //遍历每本书的页数
      //累加起来
      let pageCount = 0

      for (let i = 0; i < books.length; i++) {
        const book = books[i]
        const pages = book.numberOfPages

        pageCount += book.numberOfPages
      }
      console.log(pageCount)

    })

}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.innerHTML = book.name;
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchBooks();
});
