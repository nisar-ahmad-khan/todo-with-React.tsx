import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiCheckCircle } from "react-icons/fi";
import * as THREE from "three";

type Todo = {
  id: number;
  todo: string;
  isDone: boolean;
};


const Balloon = ({
  position,
  color,
  trigger,
}: {
  position: [number, number, number];
  color: string;
  trigger: number;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const basePos = useRef(new THREE.Vector3(...position));

  useFrame(() => {
    if (!mesh.current) return;


    const pulse = 1 + Math.min(trigger * 0.02, 0.2);
    mesh.current.scale.setScalar(pulse);

   
    mesh.current.position.lerp(
      basePos.current.clone().multiplyScalar(1 + trigger * 0.01),
      0.04
    );
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={1}>
      <Sphere ref={mesh} args={[0.25, 16, 16]} position={position}>
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </Sphere>
    </Float>
  );
};


const Background = () => {
  const colors = ["#38bdf8", "#a78bfa", "#fb7185", "#34d399", "#fbbf24"];
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const handleKeyDown = () => setTrigger(t => t + 1);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -1 }}
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.25]}
    >
      <color attach="background" args={["#020617"]} />
      <ambientLight intensity={0.6} />

      {[...Array(12)].map((_, i) => (
        <Balloon
          key={i}
          trigger={trigger}
          color={colors[i % colors.length]}
          position={[Math.cos(i) * 3, Math.sin(i) * 3, -i]}
        />
      ))}
    </Canvas>
  );
};


const App: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo.trim()) return;

    setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
    setTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos =>
      todos.map(t => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos => todos.filter(t => t.id !== id));
  };

  return (
    <>
      <Background />

      <div className="fixed inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[90%] max-w-md rounded-2xl bg-white/10 backdrop-blur-xl p-6 shadow-2xl text-white"
        >
          <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <FiCheckCircle className="text-sky-400" />
            Todo App
          </h1>

               <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={todo}
              onChange={e => setTodo(e.target.value)}
              placeholder="Add a task..."
              className="flex-1 rounded-xl bg-white/20 px-4 py-2 outline-none placeholder:text-white/60 focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-400 px-4 py-2 text-black hover:bg-sky-300 transition flex items-center justify-center"
            >
              <FiPlus size={20} />
            </button>
          </form>

         
          <div className="mt-6 space-y-3">
            <AnimatePresence>
              {todos.map(t => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3"
                >
                  <span
                    onClick={() => toggleTodo(t.id)}
                    className={`cursor-pointer flex-1 ${
                      t.isDone ? "line-through text-white/40" : ""
                    }`}
                  >
                    {t.todo}
                  </span>

                  <div className="flex gap-3 ml-4">
                    <button
                      onClick={() => toggleTodo(t.id)}
                      className={`transition ${
                        t.isDone
                          ? "text-green-400"
                          : "text-white/50 hover:text-green-400"
                      }`}
                    >
                      <FiCheckCircle size={18} />
                    </button>

                    <button
                      onClick={() => deleteTodo(t.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default App;