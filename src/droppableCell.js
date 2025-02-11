import { useDroppable } from "@dnd-kit/core";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const DroppableCell = ({ record, dataIndex, handleClear }) => {
  const { setNodeRef } = useDroppable({
    id: `${record.id}-${dataIndex}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        padding: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{record[dataIndex]}</span>
      {
        <Button
          size="small"
          icon={<CloseOutlined />}
          onClick={() => handleClear(record.id, dataIndex)}
        ></Button>
      }
    </div>
  );
};

export default DroppableCell;
