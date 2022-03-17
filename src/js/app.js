const App = {
    el: {
        button: document.querySelector('button'),
        input: document.querySelector('input'),
        todos: document.querySelector('main')
    },
    todos: [],
    add(){

        let text = this.el.input.value;

        if(text.length) {

            this.todos.push({
                id: Date.now(),
                text: text,
                done: false
            })

            this.el.input.value = '';

            this.render();

        } else {
            alert('Type something!')
        }
    },
    remove(id){
        let index = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(index, 1);
        this.render();
    },
    check(id){
        let index = this.todos.findIndex(todo => todo.id === id);
        this.todos[index].done = !this.todos[index].done;
        this.render();
    },
    render(){

        this.el.todos.innerHTML = '';

        this.todos.forEach(todo => {
            
            let todoTemplate = document.createElement('article');
            (todo.done) ? todoTemplate.classList.add('checked') : null;
            
            let infoTemplate = 
            `<section data-id="${todo.id}">
                <aside class="checkbox"><div></div></aside>
                <p class="text">${todo.text}</p>
            </section>`;

            todoTemplate.insertAdjacentHTML('beforeend', infoTemplate);
            todoTemplate.querySelector('section').addEventListener('click', () => {
                this.check(todo.id);
            });
            
            let removeTemplate = 
            `<aside class="remove">
                <img src="assets/icon-trash.svg" alt="remove todo" data-id="" />
            </aside>`;
            todoTemplate.insertAdjacentHTML('beforeend', removeTemplate);
            todoTemplate.querySelector('.remove').addEventListener('click', () => {
                this.remove(todo.id);
            });

            this.el.todos.appendChild(todoTemplate);

        })
    },
    init() {

        this.el.button.addEventListener('click', () => {
            this.add();
        });
        
        this.el.input.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                this.add();
            }
        })
        
        this.render()

        console.log('App initiated.')

    }
}

App.init();