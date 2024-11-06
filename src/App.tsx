import { useState } from 'react';
import { Input, Checkbox, Button, Card, Typography, Space, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen  bg-gradient-to-r from-purple-500 via-purple-400 to-blue-400 p-8">
      <div className="max-w-2xl mx-auto">
        <Title className="text-center text-white text-3xl mb-8" style={{ color: 'white' }}>TODO</Title>

        <Card className="shadow-xl">
          <Input
            size="large"
            placeholder="Create a new todo..."
            prefix={<PlusOutlined />}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={addTodo}
            className="mb-4"
          />

          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                >
                  <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                    {todo.text}
                  </span>
                </Checkbox>
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
                  danger
                />
              </div>
            ))}
          </div>

          <Divider />

          <div className="flex justify-between items-center">
            <span className="text-gray-500">{todos.filter(t => !t.completed).length} items left</span>

            <Space>
              <Button
                type={filter === 'all' ? 'primary' : 'text'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                type={filter === 'active' ? 'primary' : 'text'}
                onClick={() => setFilter('active')}
              >
                Active
              </Button>
              <Button
                type={filter === 'completed' ? 'primary' : 'text'}
                onClick={() => setFilter('completed')}
              >
                Completed
              </Button>
            </Space>

            <Button
              type="text"
              danger
              onClick={clearCompleted}
            >
              Clear Completed
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
