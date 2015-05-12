riot = require('riot')
require('../../src/pages/todo.html');

describe('todo', function(){
  it('should show all todos', function(){
    riot.mount(document.body, 'todo', {
      title: 'I want to behave item!',
      items: [
        { title: 'Avoid excessive coffeine', done: true },
        { title: 'Hidden item', hidden: true },
        { title: 'Be less provocative' },
        { title: 'Be nice to people' }
      ]
    })
    expect(document.querySelector('h3').textContent).toBe('I want to behave item!')
    expect(document.querySelectorAll('li').length).toBe(3)
  })
})
