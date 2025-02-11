import "./App.css";
import { useDraggable } from "@dnd-kit/core";
import { useRef } from "react";

function DraggableItem({ id, children }) {
  const draggIt = useDraggable({
    id,
  });
  const { attributes, listeners, setNodeRef, transform, isDragging } = draggIt;
  const nodeRef = useRef(null);
  const style = {
    // transform: transform
    //   ? `translate3d(${transform.x}px, ${
    //       activatorEvent
    //         ? transform.y
    //         : transform.y + (over ? size.scrollTop : 0)
    //     }px, 0)`
    //   : undefined,
    backgroundColor: isDragging ? "grey" : "lightblue",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc",
    cursor: "grab",
    padding: "0 10px",
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        nodeRef.current = node;
      }}
      {...listeners}
      {...attributes}
      style={style}
    >
      {children}
    </div>
  );
}

export default DraggableItem;
