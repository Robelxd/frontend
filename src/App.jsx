// src/App.jsx
import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true }
  ]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (!title.trim()) return alert('Task title cannot be empty');
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1e3a8a] via-[#9333ea] to-[#f59e0b] transition-all duration-700 text-white px-4 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">📝 Task Manager</h1>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add a task..."
            className="flex-1 p-2 rounded border text-black border-gray-300"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {['all', 'completed', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="text-center text-gray-800 mb-4">
          ✅ Completed: {tasks.filter(t => t.completed).length} / 📋 Total: {tasks.length}
        </div>

        <AnimatePresence>
          {filteredTasks.length ? (
            filteredTasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className={`flex justify-between items-center p-3 mb-2 rounded shadow-sm border ${
                  task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <span onClick={() => toggleComplete(task.id)} className="cursor-pointer flex-1">
                  {task.title}
                </span>
                <button onClick={() => deleteTask(task.id)} className="ml-4">
                  <TrashIcon className="h-5 w-5 text-red-500 hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center text-gray-500 text-lg mt-4"
            >
              🎉 All tasks cleared! Add some more 💼
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={addTask}
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg text-xl transition-all duration-300"
      >
        ＋
      </button>
    </div>
  );
};

export default App;
