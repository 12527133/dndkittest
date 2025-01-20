import logo from "./logo.svg";
import "./App.css";
import { useDraggable } from "@dnd-kit/core";

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    padding: "8px",
    border: "1px solid #ddd",
    marginBottom: "8px",
    backgroundColor: "white",
    cursor: "move",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : "auto",
    position: isDragging ? "absolute" : "relative",
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {children}
    </div>
  );
}

export default DraggableItem;
